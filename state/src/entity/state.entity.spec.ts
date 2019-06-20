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
} from ".";

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

describe("state entity", () => {
  describe("must validate id", () => {
    it("should return a matching object when provided with valid id", () => {
      const validId = "xcjahhe176712";

      expect(makeState(makeFakeState({ id: validId }))).toMatchObject({
        id: validId
      });
    });

    it(`should throw "${ERROR_ID_STRING}" when provided with an undefined id`, () => {
      expect(() => makeState(makeFakeState({ id: undefined }))).toThrow(
        ERROR_ID_STRING
      );
    });

    it(`should throw "${ERROR_ID_STRING}" when provided with any other type but string for id`, () => {
      expect(() => makeState(makeFakeState({ id: 17 }))).toThrow(
        ERROR_ID_STRING
      );
    });

    it(`should throw "${ERROR_ID_EMPTY}" when provided with an empty string as id`, () => {
      expect(() => makeState(makeFakeState({ id: " " }))).toThrow(
        ERROR_ID_EMPTY
      );
    });
  });

  describe("must validate type", () => {
    types.forEach(type => {
      it(`should return a matching object when provided with valid type "${type}"`, () => {
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
    });

    it(`should throw "${ERROR_VALID_TYPE}" when provided with an undefined type`, () => {
      expect(() => makeState(makeFakeState({ type: undefined }))).toThrow(
        ERROR_VALID_TYPE
      );
    });

    it(`should throw "${ERROR_VALID_TYPE}" when provided with an empty string as type`, () => {
      expect(() => makeState(makeFakeState({ type: " " }))).toThrow(
        ERROR_VALID_TYPE
      );
    });

    it(`should throw "${ERROR_VALID_TYPE}" when provided with an invalid string as type`, () => {
      expect(() =>
        makeState(makeFakeState({ type: "skadfj67sfuasdf" }))
      ).toThrow(ERROR_VALID_TYPE);
    });

    it(`should throw "${ERROR_VALID_TYPE}" when provided with a number as type`, () => {
      expect(() => makeState(makeFakeState({ type: 0 }))).toThrow(
        ERROR_VALID_TYPE
      );
    });
  });

  describe("must validate state", () => {
    const validItem = {
      batteryCharge: undefined,
      state: BedState.FREE,
      type: Type.BED
    };
    it(`should return a matching object when provided with valid type: "${validItem.type}", state: "${validItem.state}" and batteryCharge?: ${validItem.batteryCharge}`, () => {
      expect(makeState(makeFakeState(validItem))).toMatchObject(validItem);
    });

    it(`should throw "${ERROR_VALID_STATE}" when provided with not matching type: "${Type.REPEATER}" and state: "${BedState.OCCUPIED}"`, () => {
      expect(() =>
        makeState(
          makeFakeState({ state: BedState.OCCUPIED, type: Type.REPEATER })
        )
      ).toThrow(ERROR_VALID_STATE);
    });

    it(`should throw "${ERROR_VALID_STATE}" when provided with undefined state`, () => {
      expect(() => makeState(makeFakeState({ state: undefined }))).toThrow(
        ERROR_VALID_STATE
      );
    });
  });

  describe("must validate batteryCharge", () => {
    const validItem = {
      batteryCharge: 0.8,
      state: BeaconState.OK,
      type: Type.BEACON
    };

    it(`should return a matching object when provided with valid type: "${validItem.type}", state: "${validItem.state}" and batteryCharge?: ${validItem.batteryCharge}`, () => {
      expect(makeState(makeFakeState(validItem))).toMatchObject(validItem);
    });

    it(`should throw "${ERROR_BATTERY_CHARGE_FINITE_NUMBER}" when provided with undefined batteryCharge`, () => {
      expect(() =>
        makeState(
          makeFakeState({
            ...validItem,
            batteryCharge: undefined
          })
        )
      ).toThrow(ERROR_BATTERY_CHARGE_FINITE_NUMBER);
    });

    it(`should throw "${ERROR_BATTERY_CHARGE_BETWEEN_0_1}" when provided with number greater than 1 as batteryCharge`, () => {
      expect(() =>
        makeState(
          makeFakeState({
            ...validItem,
            batteryCharge: 1.1
          })
        )
      ).toThrow(ERROR_BATTERY_CHARGE_BETWEEN_0_1);
    });

    it(`should throw "${ERROR_BATTERY_CHARGE_BETWEEN_0_1}" when provided with number lower than 0 as batteryCharge`, () => {
      expect(() =>
        makeState(
          makeFakeState({
            ...validItem,
            batteryCharge: -1
          })
        )
      ).toThrow(ERROR_BATTERY_CHARGE_BETWEEN_0_1);
    });

    it(`should throw "${ERROR_BATTERY_CHARGE_UNDEFINED_FOR_TYPE}" when provided with number as batteryCharge for not matching type`, () => {
      expect(() =>
        makeState(
          makeFakeState({
            ...validItem,
            state: BedState.FREE,
            type: Type.BED
          })
        )
      ).toThrow(ERROR_BATTERY_CHARGE_UNDEFINED_FOR_TYPE);
    });
  });
});
