import { Id } from "./";

const ERROR_ID_STRING = "Id must be a string!";
const ERROR_ID_EMPTY = "Id must not be empty!";

export function isIdValid(id: Id) {
  if (typeof id !== "string") {
    throw new Error(ERROR_ID_STRING);
  }

  if (id.trim().length === 0) {
    throw new Error(ERROR_ID_EMPTY);
  }

  return true;
}
