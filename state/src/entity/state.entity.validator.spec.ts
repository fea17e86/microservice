import {
  BeaconState,
  BedState,
  isStateEntityValid,
  RepeaterState,
  Type,
  WheelchairState
} from ".";

describe("StateEntity > makeState", () => {
  const validEntities = [
    {
      batteryCharge: 0.0008,
      id: "666sjdksd",
      state: BeaconState.LOW_BATTERY,
      type: Type.BEACON
    },
    { id: "sdsdhsd765t", type: Type.BED, state: BedState.FREE },
    { id: "jdksdf87zfd", type: Type.REPEATER, state: RepeaterState.BROKEN },
    { id: "0", type: Type.WHEELCHAIR, state: WheelchairState.FREE }
  ];

  validEntities.forEach(entity => {
    it("must return true for valid state entity", () => {
      expect(isStateEntityValid(entity)).toBeTruthy();
    });
  });

  const invalidEntities = [
    { state: RepeaterState.IN_MAINTENANCE, type: Type.REPEATER },
    { id: 0, state: WheelchairState.DIRTY, type: Type.WHEELCHAIR },
    { id: "a", state: BedState.IN_MAINTENANCE },
    { id: "a", state: BedState.IN_MAINTENANCE, type: 0 },
    { id: "a", type: Type.BED },
    { id: "a", state: 0, type: Type.WHEELCHAIR },
    { id: "a", state: "  ", type: Type.REPEATER },
    { id: "a", state: BedState.DIRTY, type: Type.REPEATER },
    { id: "a", state: BeaconState.LOW_BATTERY, type: Type.BEACON },
    {
      batteryCharge: -1,
      id: "a",
      state: BeaconState.LOW_BATTERY,
      type: Type.BEACON
    },
    {
      batteryCharge: 1.00001,
      id: "a",
      state: BeaconState.LOW_BATTERY,
      type: Type.BEACON
    },
    { batteryCharge: 1, id: "a", state: BedState.FREE, type: Type.BED }
  ];
  invalidEntities.forEach(entity => {
    it("must throw an excetion", () => {
      expect(() => isStateEntityValid(entity)).toThrowError();
    });
  });
});
