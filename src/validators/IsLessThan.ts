// import {
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
//   ValidationArguments,
// } from "class-validator";

// interface ObjType {
//   [key: string]: string;
// }

// @ValidatorConstraint({ name: "IsLessThan", async: false })
// export class IsLessThan implements ValidatorConstraintInterface {
//   validate(value: any, args: ValidationArguments) {
//     const object = args.object as ObjType;
//     return object.price > value;
//   }

//   defaultMessage(args: ValidationArguments) {
//     const object = args.object as ObjType;
//     return `Price discount (${args.value}) must be less than price (${object.price}).`;
//   }
// }

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

// Custom decorator to validate that a property's value is less than another property's value
export function IsLessThan(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isLessThan", // The name of the decorator
      target: object.constructor, // The target entity class
      propertyName: propertyName, // The property to which the decorator is applied
      options: validationOptions, // Any validation options passed to the decorator
      constraints: [property], // The property to compare with
      validator: {
        // Validation logic
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints; // The name of the related property
          const relatedValue = (args.object as any)[relatedPropertyName]; // The value of the related property
          return (
            typeof value === "number" &&
            typeof relatedValue === "number" &&
            value < relatedValue
          );
        },
        // Default validation error message
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${args.property} must be less than ${relatedPropertyName}`;
        },
      },
    });
  };
}
