import { BatteryCharge, Id, State, Type } from "./";

export interface IMakeStateOptions {
  id: Id;
  type: Type;
  state: State;
  batteryCharge?: BatteryCharge;
}

export interface IStateEntity {
  readonly id: Id;
  readonly type: Type;
  readonly state: State;
  readonly batteryCharge?: BatteryCharge;
}

type ValidatorResult = boolean;
export type IdValidator = (id: Id) => ValidatorResult;
export type TypeValidator = (type: Type) => ValidatorResult;
export type StateValidator = (
  type: Type,
  state: State,
  batteryCharge?: BatteryCharge
) => ValidatorResult;
interface IBuildMakeStateOptions {
  isIdValid: IdValidator;
  isTypeValid: TypeValidator;
  isStateValid: StateValidator;
}

export default function buildMakeState({
  isIdValid,
  isTypeValid,
  isStateValid
}: IBuildMakeStateOptions): (options: IMakeStateOptions) => IStateEntity {
  return function makeState({
    id,
    type,
    state,
    batteryCharge
  }: IMakeStateOptions): IStateEntity {
    isIdValid(id);
    isTypeValid(type);
    isStateValid(type, state, batteryCharge);

    return Object.freeze({
      batteryCharge,
      id,
      state,
      type
    });
  };
}
