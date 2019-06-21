export * from "./battery-charge";
export * from "./id";
export * from "./state";
export * from "./state.entity";
export * from "./state.entity.validator";
export * from "./type";

import { isBatteryChargeValid } from "./battery-charge";
import { isIdValid } from "./id";
import { isStateValid } from "./state";
import { buildMakeState } from "./state.entity";
import { buildIsStateEntityValid } from "./state.entity.validator";
import { isTypeValid } from "./type";

export const isStateEntityValid = buildIsStateEntityValid({
  isBatteryChargeValid,
  isIdValid,
  isStateValid,
  isTypeValid
});

export const makeState = buildMakeState({ isStateEntityValid });
