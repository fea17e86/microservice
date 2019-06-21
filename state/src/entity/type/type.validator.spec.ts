import { ERROR_VALID_TYPE, isTypeValid, Type } from "./";

describe("must validate type", () => {
  const validTypes = [Type.BEACON, Type.BED, Type.REPEATER, Type.WHEELCHAIR];
  validTypes.forEach(type => {
    it(`must return true when provided with valid type "${type}"`, () => {
      expect(isTypeValid(type)).toBeTruthy();
    });
  });

  it(`must throw "${ERROR_VALID_TYPE}" when provided with an undefined type`, () => {
    expect(() => isTypeValid(undefined)).toThrow(ERROR_VALID_TYPE);
  });

  it(`must throw "${ERROR_VALID_TYPE}" when provided with an empty string as type`, () => {
    expect(() => isTypeValid(" ")).toThrow(ERROR_VALID_TYPE);
  });

  it(`must throw "${ERROR_VALID_TYPE}" when provided with an invalid string as type`, () => {
    expect(() => isTypeValid("skadfj67sfuasdf")).toThrow(ERROR_VALID_TYPE);
  });

  it(`must throw "${ERROR_VALID_TYPE}" when provided with a number as type`, () => {
    expect(() => isTypeValid(0)).toThrow(ERROR_VALID_TYPE);
  });
});
