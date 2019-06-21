import { ERROR_ID_EMPTY, ERROR_ID_STRING, isIdValid } from "./";

describe("isIdValid", () => {
  it("must return true for valid id", () => {
    expect(isIdValid("xcjahhe176712")).toBeTruthy();
  });

  it(`must throw "${ERROR_ID_STRING}" when provided with an undefined id`, () => {
    expect(() => isIdValid(undefined)).toThrow(ERROR_ID_STRING);
  });

  it(`must throw "${ERROR_ID_STRING}" when provided with any other type but string for id`, () => {
    expect(() => isIdValid(17)).toThrow(ERROR_ID_STRING);
  });

  it(`must throw "${ERROR_ID_EMPTY}" when provided with an empty string as id`, () => {
    expect(() => isIdValid(" ")).toThrow(ERROR_ID_EMPTY);
  });
});
