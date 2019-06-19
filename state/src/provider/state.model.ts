import { Document, Model, Mongoose, Schema } from "mongoose";
import { BatteryCharge, Id, State, Type } from "../entities";

export interface IStateDocument extends Document {
  id: Id;
  type: Type;
  state: State;
  batteryCharge?: BatteryCharge;
}

export const StateSchema = new Schema({
  batteryCharge: Number,
  id: { type: String, required: true },
  state: { type: String },
  type: { type: String, enum: Type }
});

export const MODEL_NAME = "State";

export type IStateModel = Model<IStateDocument>;

export default function makeModel(mongoose: Mongoose): IStateModel {
  return mongoose.model<IStateDocument>(MODEL_NAME, StateSchema);
}
