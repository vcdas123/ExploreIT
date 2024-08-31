import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { registerDecorator, ValidationOptions } from "class-validator";

@ValidatorConstraint({ name: "isAlphaCustom", async: false })
export class IsAlphaCustomValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    return /^[a-zA-Z\s]+$/.test(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return "Name (name) must contain only alphabetic characters and spaces";
  }
}

export function IsAlphaCheck(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isAlphaCustom",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAlphaCustomValidator,
    });
  };
}
