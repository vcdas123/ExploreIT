import { ValidationError } from "class-validator";

export const formatValidationErrors = (
  errors: ValidationError[],
  path: string[] = []
): any[] => {
  const formattedErrors: any[] = [];

  errors.forEach(error => {
    const currentPath = [...path, error.property];

    if (error.constraints) {
      Object.keys(error.constraints).forEach(constraintKey => {
        formattedErrors.push({
          property: currentPath.join("."),
          constraint: constraintKey,
          message: error.constraints ? error.constraints[constraintKey] : "",
        });
      });
    }

    if (error.children && error.children.length > 0) {
      formattedErrors.push(
        ...formatValidationErrors(error.children, currentPath)
      );
    }
  });

  return formattedErrors;
};
