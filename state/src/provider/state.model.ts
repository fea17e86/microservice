import {
  Document as MongooseDocument,
  Model as MongooseModel,
  Schema as MongooseSchema
} from "mongoose";
import { BatteryCharge, Id, IStateEntity, State, Type } from "../entity";

export type Document = MongooseDocument;
export type Model<T extends Document> = MongooseModel<T>;
export class Schema<T extends Document> extends MongooseSchema<T> {}

export interface IStateDocument extends Document {
  id: Id;
  type: Type;
  state: State;
  batteryCharge?: BatteryCharge;
}

export const StateSchema = new Schema<IStateDocument>({
  batteryCharge: Number,
  id: { type: String, required: true },
  state: { type: String },
  type: { type: String, enum: Type }
});

export interface ISetStateItem {
  batteryCharge?: BatteryCharge;
  id: Id;
  state?: State;
  type?: Type;
}

export const MODEL_NAME = "State";

export interface IStateModel extends Model<IStateDocument> {
  get(id: Id): Promise<IStateDocument | undefined>;
  list(conditions?: Partial<IStateEntity>): Promise<IStateDocument[]>;
  set(item: ISetStateItem): Promise<IStateDocument>;
}
