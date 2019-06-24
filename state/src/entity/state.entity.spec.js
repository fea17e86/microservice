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
});
