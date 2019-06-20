import { BatteryCharge, Id, State, Type } from ".";

export interface IMakeStateOptions {
  id: Id;
  type: Type;
  state: State;
  batteryCharge?: BatteryCharge;
}

export interface IStateItem {
  readonly id: Id;
  readonly type: Type;
  readonly state: State;
  readonly batteryCharge?: BatteryCharge;
}

type ValidatorResult = boolean;
export type IdValidator = (id: Id) => ValidatorResult;
export type TypeValidator = (type: Type) => ValidatorResult;
export type StateValidator = (type: Type, state: State) => ValidatorResult;
export type BatteryChargeValidator = (
  type: Type,
  batteryCharge?: BatteryCharge
) => ValidatorResult;
interface IBuildMakeStateOptions {
  isBatteryChargeValid: BatteryChargeValidator;
  isIdValid: IdValidator;
  isTypeValid: TypeValidator;
  isStateValid: StateValidator;
}

export default function buildMakeState({
  isBatteryChargeValid,
  isIdValid,
  isTypeValid,
  isStateValid
}: IBuildMakeStateOptions): (options: IMakeStateOptions) => IStateItem {
  return function makeState({
    id,
    type,
    state,
    batteryCharge
  }: IMakeStateOptions): IStateItem {
    isIdValid(id);
    isTypeValid(type);
    isStateValid(type, state);
    isBatteryChargeValid(type, batteryCharge);

    return Object.freeze({
      batteryCharge,
      id,
      state,
      type
    });
  };
}
