import { connect, Mongoose } from "mongoose";
import { Id, IStateEntity } from "../entity";
import {
  IPatchStateItem,
  IStateDocument,
  IStateModel,
  Model,
  Schema
} from "./";

export type MakeStateModel = (
  name: string,
  schema: Schema<IStateDocument>
) => Promise<IStateModel>;

export interface IStateModelFactory {
  model: MakeStateModel;
}

interface IStateModelFactoryOptions {
  password?: string;
  username?: string;
}

export class StateModelFactory implements IStateModelFactory {
  private mongoose: Mongoose | undefined;
  private options: IStateModelFactoryOptions;
  private uri: string;

  constructor(uri: string, options: IStateModelFactoryOptions = {}) {
    this.options = options;
    this.uri = uri;
  }

  public async model(
    name: string,
    schema: Schema<IStateDocument>
  ): Promise<IStateModel> {
    const mongoose = await this.getMongoose();
    const MongooseModel: Model<IStateDocument> = mongoose.model<IStateDocument>(
      name,
      schema
    );
    const StateModel: IStateModel = MongooseModel as IStateModel;

    StateModel.add = async function add(
      item: IStateEntity
    ): Promise<IStateDocument> {
      const existing: IStateDocument | undefined = await this.get(item.id);
      if (existing === undefined) {
        const newItem = new MongooseModel(item);
        return newItem.save();
      } else {
        return existing;
      }
    };

    StateModel.list = async function list(
      properties?: Partial<IStateEntity>
    ): Promise<IStateDocument[]> {
      return StateModel.find(properties).exec();
    };

    StateModel.get = async function get(
      id: Id
    ): Promise<IStateDocument | undefined> {
      const doc: IStateDocument | null = await StateModel.findOne({
        id
      }).exec();
      if (doc != null) {
        return doc;
      }
      return undefined;
    };

    StateModel.patch = async function patch({
      id,
      ...update
    }: IPatchStateItem): Promise<IStateDocument | undefined> {
      const patchedItem: IStateDocument | null = await StateModel.findOneAndUpdate(
        { id },
        update
      );
      return patchedItem == null ? undefined : patchedItem;
    };

    return StateModel;
  }

  private async getMongoose(): Promise<Mongoose> {
    if (this.mongoose === undefined) {
      const { password: pass, username: user, ...options } = this.options;
      this.mongoose = await connect(
        this.uri,
        { ...options, user, pass }
      );
    }

    return this.mongoose;
  }
}
