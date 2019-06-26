import { Type } from "..";

export const ERROR_BATTERY_CHARGE_FINITE_NUMBER =
  "BatteryCharge must be a finite number!";
export const ERROR_BATTERY_CHARGE_BETWEEN_0_1 =
  "BatteryCharge must be a number between and including 0 and 1!";
export const ERROR_BATTERY_CHARGE_UNDEFINED_FOR_TYPE =
  "BatteryCharge must be undefined for this type!";

export function isBatteryChargeValid(type?: any, batteryCharge?: any) {
  if (type === Type.BEACON) {
    if (typeof batteryCharge !== "number" || !isFinite(batteryCharge)) {
      throw new Error(ERROR_BATTERY_CHARGE_FINITE_NUMBER);
    }

    if (batteryCharge < 0 || batteryCharge > 1) {
      throw new Error(ERROR_BATTERY_CHARGE_BETWEEN_0_1);
    }
  } else {
    if (batteryCharge !== undefined) {
      throw new Error(ERROR_BATTERY_CHARGE_UNDEFINED_FOR_TYPE);
    }
  }

  return true;
}
