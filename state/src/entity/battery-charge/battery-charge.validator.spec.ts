import {
  ERROR_BATTERY_CHARGE_BETWEEN_0_1,
  ERROR_BATTERY_CHARGE_FINITE_NUMBER,
  ERROR_BATTERY_CHARGE_UNDEFINED_FOR_TYPE
} from ".";
import { Type } from "../";
import { isBatteryChargeValid } from "./battery-charge.validator";

describe("isBatteryChargeValid", () => {
  const validCombinations = [
    { batteryCharge: 0.8, type: Type.BEACON },
    { type: Type.BED }
  ];

  validCombinations.forEach(({ batteryCharge, type }) => {
    it(`must return true for valid type: ${type} and batteryCharge: ${batteryCharge}`, () => {
      expect(isBatteryChargeValid(type, batteryCharge)).toBeTruthy();
    });
  });

  it(`must throw "${ERROR_BATTERY_CHARGE_FINITE_NUMBER}" when provided with type: ${Type.BEACON} and batteryChargd: undefined`, () => {
    expect(() => isBatteryChargeValid(Type.BEACON, undefined)).toThrow(
      ERROR_BATTERY_CHARGE_FINITE_NUMBER
    );
  });

  it(`must throw "${ERROR_BATTERY_CHARGE_FINITE_NUMBER}" when provided with string as batteryCharge`, () => {
    expect(() => isBatteryChargeValid(Type.BEACON, "0.8")).toThrow(
      ERROR_BATTERY_CHARGE_FINITE_NUMBER
    );
  });

  it(`should throw "${ERROR_BATTERY_CHARGE_BETWEEN_0_1}" when provided with number greater than 1 as batteryCharge`, () => {
    expect(() => isBatteryChargeValid(Type.BEACON, 1.1)).toThrow(
      ERROR_BATTERY_CHARGE_BETWEEN_0_1
    );
  });

  it(`should throw "${ERROR_BATTERY_CHARGE_BETWEEN_0_1}" when provided with number lower than 0 as batteryCharge`, () => {
    expect(() => isBatteryChargeValid(Type.BEACON, -1)).toThrow(
      ERROR_BATTERY_CHARGE_BETWEEN_0_1
    );
  });

  it(`should throw "${ERROR_BATTERY_CHARGE_UNDEFINED_FOR_TYPE}" when provided with number as batteryCharge for not matching type`, () => {
    expect(() => isBatteryChargeValid(Type.BED, 0.8)).toThrow(
      ERROR_BATTERY_CHARGE_UNDEFINED_FOR_TYPE
    );
  });
});
