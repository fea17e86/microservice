import * as cuid from "cuid";

import {
  BeaconState,
  BedState,
  ERROR_BATTERY_CHARGE_BETWEEN_0_1,
  ERROR_BATTERY_CHARGE_FINITE_NUMBER,
  ERROR_BATTERY_CHARGE_UNDEFINED_FOR_TYPE,
  ERROR_ID_EMPTY,
  ERROR_ID_STRING,
  ERROR_VALID_STATE,
  ERROR_VALID_TYPE,
  IStateItem,
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

export function getRandomBatteryCharge(type: Type) {
  if (type === Type.BEACON) {
    return Math.round(Math.random() * 100) / 100;
  }

  return undefined;
}

interface IStateOverrides {
  id?: any;
  type?: any;
  state?: any;
  batteryCharge?: any;
}

export function makeFakeState(overrides: IStateOverrides): IStateItem {
  const type = getRandomType();
  const state = getRandomState(type);
  const batteryCharge = getRandomBatteryCharge(type);
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
      expect(
        makeState(
          makeFakeState({
            batteryCharge: getRandomBatteryCharge(type),
            state: getRandomState(type),
            type
          })
        )
      ).toMatchObject({
        type
      });
    });

    expect(() => makeState(makeFakeState({ type: undefined }))).toThrow(
      ERROR_VALID_TYPE
    );

    expect(() => makeState(makeFakeState({ type: 0 }))).toThrow(
      ERROR_VALID_TYPE
    );
  });

  it("must have a valid state", () => {
    const randomType = getRandomType();
    const randomState = getRandomState(randomType);
    const randomBatteryCharge = getRandomBatteryCharge(randomType);

    expect(
      makeState(
        makeFakeState({
          batteryCharge: randomBatteryCharge,
          state: randomState,
          type: randomType
        })
      )
    ).toMatchObject({
      batteryCharge: randomBatteryCharge,
      state: randomState,
      type: randomType
    });

    expect(() =>
      makeState(
        makeFakeState({ state: BedState.OCCUPIED, type: Type.REPEATER })
      )
    ).toThrow(ERROR_VALID_STATE);

    expect(() => makeState(makeFakeState({ state: undefined }))).toThrow(
      ERROR_VALID_STATE
    );

    expect(() => makeState(makeFakeState({ state: 0 }))).toThrow(
      ERROR_VALID_STATE
    );
  });

  it("must have a valid battery charge", () => {
    const validBatteryCharge = {
      batteryCharge: 0.8,
      state: BeaconState.OK,
      type: Type.BEACON
    };

    expect(makeState(makeFakeState(validBatteryCharge))).toMatchObject(
      validBatteryCharge
    );

    expect(() =>
      makeState(
        makeFakeState({
          ...validBatteryCharge,
          batteryCharge: undefined
        })
      )
    ).toThrow(ERROR_BATTERY_CHARGE_FINITE_NUMBER);

    expect(() =>
      makeState(
        makeFakeState({
          ...validBatteryCharge,
          batteryCharge: 1.1
        })
      )
    ).toThrow(ERROR_BATTERY_CHARGE_BETWEEN_0_1);

    expect(() =>
      makeState(
        makeFakeState({
          ...validBatteryCharge,
          batteryCharge: -1
        })
      )
    ).toThrow(ERROR_BATTERY_CHARGE_BETWEEN_0_1);

    expect(() =>
      makeState(
        makeFakeState({
          ...validBatteryCharge,
          state: BedState.FREE,
          type: Type.BED
        })
      )
    ).toThrow(ERROR_BATTERY_CHARGE_UNDEFINED_FOR_TYPE);
  });
});
