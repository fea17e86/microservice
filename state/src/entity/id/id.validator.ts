export const ERROR_ID_STRING = "Id must be a string!";
export const ERROR_ID_EMPTY = "Id must not be empty!";

export function isIdValid(id?: any) {
  if (typeof id !== "string") {
    throw new Error(ERROR_ID_STRING);
  }

  if (id.trim().length === 0) {
    throw new Error(ERROR_ID_EMPTY);
  }

  return true;
}
