import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsValidImage(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isImageUrl",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== "string") return false;
          // Regular expression to validate JPG, JPEG, and PNG URLs
          const regex = /\.(jpg|jpeg|png)$/i;
          return regex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `The value of ${args.property} must be a valid image URL ending with .jpg, .jpeg, or .png`;
        },
      },
    });
  };
}
