import { Type } from "../";
import {
  BeaconState,
  BedState,
  ERROR_VALID_STATE,
  isStateValid,
  RepeaterState,
  WheelchairState
} from "./";

describe("isStateValid", () => {
  const validStates = {
    [Type.BEACON]: Object.values(BeaconState),
    [Type.BED]: Object.values(BedState),
    [Type.REPEATER]: Object.values(RepeaterState),
    [Type.WHEELCHAIR]: Object.values(WheelchairState)
  };

  Object.entries(validStates).forEach(([type, states]) => {
    states.forEach(state => {
      it(`must return true when provided with valid type: "${type}" and state: "${state}"`, () => {
        expect(isStateValid(type, state)).toBeTruthy();
      });
    });
  });

  it(`must throw "${ERROR_VALID_STATE}" when provided with not matching type: "${Type.REPEATER}" and state: "${BedState.OCCUPIED}"`, () => {
    expect(() => isStateValid(Type.REPEATER, BedState.OCCUPIED)).toThrow(
      ERROR_VALID_STATE
    );
  });

  it(`must throw "${ERROR_VALID_STATE}" when provided with undefined state`, () => {
    expect(() => isStateValid(Type.WHEELCHAIR)).toThrow(ERROR_VALID_STATE);
  });

  it(`must throw "${ERROR_VALID_STATE}" when provided with number as state`, () => {
    expect(() => isStateValid(Type.WHEELCHAIR, 1)).toThrow(ERROR_VALID_STATE);
  });

  it(`must throw "${ERROR_VALID_STATE}" when provided with empty string as state`, () => {
    expect(() => isStateValid(Type.WHEELCHAIR, " ")).toThrow(ERROR_VALID_STATE);
  });
});
