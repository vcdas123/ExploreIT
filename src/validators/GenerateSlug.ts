import { registerDecorator, ValidationArguments } from "class-validator";
import slugify from "slugify";

export function GenerateSlug(sourceField: string) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "generateSlug",
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: "Failed to generate slug",
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          if (obj[sourceField]) {
            const slug = slugify(obj[sourceField], { lower: true });
            obj[propertyName] = slug;
            return true;
          }
          return false;
        },
      },
    });
  };
}
