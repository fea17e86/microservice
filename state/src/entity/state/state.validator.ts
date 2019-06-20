import { Type } from "..";
import {
  BeaconState,
  BedState,
  RepeaterState,
  State,
  WheelchairState
} from ".";

export const ERROR_VALID_STATE = "State must be valid!";

export function isStateValid(type: Type, state: State) {
  switch (type) {
    case Type.BEACON: {
      if (Object.values(BeaconState).includes(state)) {
        return true;
      }
      break;
    }
    case Type.BED: {
      if (Object.values(BedState).includes(state)) {
        return true;
      }
      break;
    }
    case Type.REPEATER: {
      if (Object.values(RepeaterState).includes(state)) {
        return true;
      }
      break;
    }
    case Type.WHEELCHAIR: {
      if (Object.values(WheelchairState).includes(state)) {
        return true;
      }
      break;
    }
    default:
  }
  throw new Error(ERROR_VALID_STATE);
}
