import { connect, Mongoose } from "mongoose";
import { Id, IStateItem } from "../entity";
import { ISetStateItem, IStateDocument, IStateModel, Model, Schema } from "./";

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

    StateModel.list = async function list(
      properties?: Partial<IStateItem>
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

    StateModel.set = async function set(
      item: ISetStateItem
    ): Promise<IStateDocument> {
      const existing: IStateDocument | undefined = await this.get(item.id);
      if (existing === undefined) {
        const newItem = new MongooseModel(item);
        return newItem.save();
      } else {
        return existing.update(item).exec();
      }
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
