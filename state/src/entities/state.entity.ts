import {
  BatteryCharge,
  Id,
  isIdValid,
  isStateValie,
  isTypeValid,
  State,
  Type
} from "./";

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

type ValidatorResult = Error | true;
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
    const idError = isIdValid(id);
    if (idError !== undefined) {
      throw idError;
    }

    const typeError = isTypeValid(type);
    if (typeError !== undefined) {
      throw typeError;
    }

    const stateError = isStateValid(type, state, batteryCharge);
    if (stateError !== undefined) {
      throw stateError;
    }

    return Object.freeze({
      batteryCharge,
      id,
      state,
      type
    });
  };
}
