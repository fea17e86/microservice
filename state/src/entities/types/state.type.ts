export enum BeaconState {
  BROKEN = "broken",
  IN_MAINTENANCE = "in-maintenance",
  LOW_BATTERY = "low-battery",
  OK = "ok"
}
export enum BedState {
  BROKEN = "broken",
  DIRTY = "dirty",
  FREE = "free",
  IN_MAINTENANCE = "in-maintenance",
  OCCUPIED = "occupied"
}
export enum RepeaterState {
  BROKEN = "broken",
  IN_MAINTENANCE = "in-maintenance",
  OK = "ok"
}
export enum WheelchairState {
  BROKEN = "broken",
  DIRTY = "dirty",
  FREE = "free",
  IN_MAINTENANCE = "in-maintenance",
  OCCUPIED = "occupied"
}
export type State = BeaconState | BedState | RepeaterState | WheelchairState;
