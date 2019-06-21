interface IStateItem {
  batteryCharge?: any;
  id?: any;
  state?: any;
  type?: any;
}

type Validator = (...args: any[]) => boolean;
interface IBuildValidatorOptions {
  isBatteryChargeValid: Validator;
  isIdValid: Validator;
  isStateValid: Validator;
  isTypeValid: Validator;
}

export function buildIsStateEntityValid({
  isBatteryChargeValid,
  isIdValid,
  isStateValid,
  isTypeValid
}: IBuildValidatorOptions): Validator {
  return function isStateEntityValid({
    batteryCharge,
    id,
    state,
    type
  }: IStateItem = {}): boolean {
    return (
      isIdValid(id) &&
      isTypeValid(type) &&
      isStateValid(type, state) &&
      isBatteryChargeValid(type, batteryCharge)
    );
  };
}
