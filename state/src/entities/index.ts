export * from "./battery-charge";
export * from "./id";
export * from "./state";
export * from "./state.entity";
export * from "./type";

import { isBatteryChargeValid } from "./battery-charge";
import { isIdValid } from "./id";
import { isStateValid } from "./state";
import { default as buildMakeState } from "./state.entity";
import { isTypeValid } from "./type";

export const makeState = buildMakeState({
  isBatteryChargeValid,
  isIdValid,
  isStateValid,
  isTypeValid
});
