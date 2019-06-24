import {
  Document as MongooseDocument,
  Model as MongooseModel,
  Schema as MongooseSchema
} from "mongoose";
import { BatteryCharge, IStateEntity, State, Type } from "../entity";

export type Document = MongooseDocument;
export type Model<T extends Document> = MongooseModel<T>;
export class Schema<T extends Document> extends MongooseSchema<T> {}

export interface IStateDocument extends Document {
  id: string;
  type: Type;
  state: State;
  batteryCharge?: BatteryCharge;
}

export interface IPatchStateProperties {
  batteryCharge?: BatteryCharge;
  state?: State;
  type?: Type;
}

export const StateSchema = new Schema<IStateDocument>(
  {
    batteryCharge: Number,
    id: { type: String, required: true },
    state: { type: String },
    type: { type: String, enum: Type }
  },
  { _id: false }
);

export const MODEL_NAME = "State";

export interface IStateModel extends Model<IStateDocument> {
  add(item: IStateEntity): Promise<IStateDocument>;
  get(id: string): Promise<IStateDocument | undefined>;
  list(conditions?: Partial<IStateEntity>): Promise<IStateDocument[]>;
  patch(
    id: string,
    properties: IPatchStateProperties
  ): Promise<IStateDocument | undefined>;
}
