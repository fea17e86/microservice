/// <reference types="jest" />
import * as cuid from "cuid";
import {
  BeaconState,
  BedState,
  ERROR_ID_EMPTY,
  ERROR_ID_STRING,
  ERROR_VALID_TYPE,
  IStateEntity,
  makeState,
  RepeaterState,
  State,
  Type,
  WheelchairState
} from "./";

const types = [Type.BEACON, Type.BED, Type.REPEATER, Type.WHEELCHAIR];

export function getRandomType(): Type {
  return types[Math.floor(Math.random() * types.length)];
}

export function getRandomState(type: Type): State {
  switch (type) {
    case Type.BEACON: {
      const states = [
        BeaconState.BROKEN,
        BeaconState.IN_MAINTENANCE,
        BeaconState.LOW_BATTERY,
        BeaconState.OK
      ];
      return states[Math.floor(Math.random() * states.length)];
    }
    case Type.BED: {
      const states = [
        BedState.BROKEN,
        BedState.DIRTY,
        BedState.FREE,
        BedState.IN_MAINTENANCE,
        BedState.OCCUPIED
      ];
      return states[Math.floor(Math.random() * states.length)];
    }
    case Type.REPEATER: {
      const states = [
        RepeaterState.BROKEN,
        RepeaterState.IN_MAINTENANCE,
        RepeaterState.OK
      ];
      return states[Math.floor(Math.random() * states.length)];
    }
    case Type.WHEELCHAIR: {
      const states = [
        WheelchairState.BROKEN,
        WheelchairState.DIRTY,
        WheelchairState.FREE,
        WheelchairState.IN_MAINTENANCE,
        WheelchairState.OCCUPIED
      ];
      return states[Math.floor(Math.random() * states.length)];
    }
    default:
      return BeaconState.OK;
  }
}

export function getRandomBatteryCharge(type: Type, state: State) {
  if (type === Type.BEACON) {
    if (state === BeaconState.LOW_BATTERY) {
      return Math.round(Math.random() * 30) / 100;
    }

    return (Math.round(Math.random() * 69) + 31) / 100;
  }

  return undefined;
}

interface IStateOverrides {
  id?: any;
  type?: any;
  state?: any;
  batteryCharge?: any;
}

export function makeFakeState(overrides: IStateOverrides): IStateEntity {
  const type = getRandomType();
  const state = getRandomState(type);
  const batteryCharge = getRandomBatteryCharge(type, state);
  return {
    batteryCharge,
    id: cuid(),
    state,
    type,
    ...overrides
  };
}

describe("state", () => {
  it("must have a valid id", () => {
    const validId = "xcjahhe176712";
    expect(makeState(makeFakeState({ id: validId }))).toMatchObject({
      id: validId
    });

    expect(() => makeState(makeFakeState({ id: undefined }))).toThrow(
      ERROR_ID_STRING
    );

    expect(() => makeState(makeFakeState({ id: 17 }))).toThrow(ERROR_ID_STRING);

    expect(() => makeState(makeFakeState({ id: " " }))).toThrow(ERROR_ID_EMPTY);
  });

  it("must have a valid type", () => {
    types.forEach(type => {
      expect(makeState(makeFakeState({ type }))).toMatchObject({
        type
      });
    });

    expect(() => makeState(makeFakeState({ type: "bla" }))).toThrow(
      ERROR_VALID_TYPE
    );
  });
  it.todo("must have a valid state");
});
