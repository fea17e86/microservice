import { BatteryCharge, State, Type } from ".";

export interface IStateEntity {
  readonly id: string;
  readonly type: Type;
  readonly state: State;
  readonly batteryCharge?: BatteryCharge;
}

interface IBuildMakeStateOptions {
  isStateEntityValid: (...arg: any[]) => boolean;
}

interface IMakeStateProperties {
  id: string;
  type: Type;
  state: State;
  batteryCharge?: BatteryCharge;
}

export type MakeStateEntity = (options: IMakeStateProperties) => IStateEntity;

export function buildMakeState({
  isStateEntityValid
}: IBuildMakeStateOptions): MakeStateEntity {
  return function makeState(properties: IMakeStateProperties): IStateEntity {
    isStateEntityValid(properties);

    return Object.freeze({
      batteryCharge: properties.batteryCharge,
      id: properties.id,
      state: properties.state,
      type: properties.type
    });
  };
}
