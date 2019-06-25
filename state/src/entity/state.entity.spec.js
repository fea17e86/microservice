import { BedState, makeState, Type } from "./";
import { RepeaterState, BeaconState } from "./state/state.type";

describe("test makeState", () => {
  it("using valid properties must return a matching object", () => {
    const props = { id: "test-id", type: Type.BED, state: BedState.DIRTY };
    expect(makeState(props)).toMatchObject(props);
  });

  it("using invalid properties, must throw an error", () => {
    const props = { type: Type.BED, state: BedState.DIRTY };
    expect(() => makeState(props)).toThrowError();
  });

  it("returned object cannot be altered", () => {
    const item = makeState({
      id: "test-id",
      type: Type.BED,
      state: BedState.DIRTY
    });

    expect(() => {
      item.id = "new-id";
    }).toThrowError();

    expect(() => {
      item.type = Type.REPEATER;
    }).toThrowError();

    expect(() => {
      item.state = RepeaterState.IN_MAINTENANCE;
    }).toThrowError();

    expect(() => {
      item.batteryCharge = undefined;
    }).toThrowError();
  });
});
