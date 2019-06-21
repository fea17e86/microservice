import { Type } from ".";

export const ERROR_VALID_TYPE = "Type must be valid!";

export function isTypeValid(type?: any) {
  if (!Object.values(Type).includes(type)) {
    throw new Error(ERROR_VALID_TYPE);
  }

  return true;
}
