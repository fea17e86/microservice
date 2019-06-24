import { BedState, makeState, Type } from "./";
import { RepeaterState, BeaconState } from "./state/state.type";

describe("test makeState", () => {
  it("using valid properties mus return a mathcing object", () => {
    const props = { id: "test-id", type: Type.BED, state: BedState.DIRTY };
    expect(makeState(props)).toMatchObject(props);
  });

  it(`using type ${Type.BEACON} with batteryCharge, must return a mathcing object`, () => {
    const props = {
      id: "test-id",
      type: Type.BEACON,
      state: BeaconState.LOW_BATTERY,
      batteryCharge: 0.2
    };
    expect(makeState(props)).toMatchObject(props);
  });

  it(`using type ${Type.BEACON} without batteryCharge, must return a mathcing object`, () => {
    const props = {
      id: "test-id",
      type: Type.BEACON,
      state: BeaconState.LOW_BATTERY
    };
    expect(makeState(props)).toMatchObject(props);
  });

  it("using missing id, must throw an error", () => {
    const props = { type: Type.BED, state: BedState.DIRTY };
    expect(() => makeState(props)).toThrowError();
  });

  it("using missing type, must throw an error", () => {
    const props = { id: "test-id", state: BedState.DIRTY };
    expect(() => makeState(props)).toThrowError();
  });

  it("using not matching type and state, must throw an error", () => {
    const props = {
      id: "test-id",
      type: Type.BED,
      state: BeaconState.LOW_BATTERY
    };
    expect(() => makeState(props)).toThrowError();
  });

  it(`using batteryCharge with other type than ${Type.BEACON}, must throw an error`, () => {
    const props = {
      id: "test-id",
      type: Type.BED,
      state: BedState.DIRTY,
      batteryCharge: 1.0
    };
    expect(() => makeState(props)).toThrowError();
  });

  it("batteryCharge > 1.0, must throw an error", () => {
    const props = {
      id: "test-id",
      type: Type.BEACON,
      state: BeaconState.LOW_BATTERY,
      batteryCharge: 1.01
    };
    expect(() => makeState(props)).toThrowError();
  });

  it("batteryCharge < 0, must throw an error", () => {
    const props = {
      id: "test-id",
      type: Type.BEACON,
      state: BeaconState.LOW_BATTERY,
      batteryCharge: -0.01
    };
    expect(() => makeState(props)).toThrowError();
  });
});
