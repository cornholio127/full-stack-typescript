import { FormikErrors } from 'formik';
import { isEmpty } from './util';

export type ValidationRule<T> = (values: T) => [string, string] | undefined;

export const notEmpty = <T>(field: keyof T): ValidationRule<T> => {
  return (values: T) => {
    const value = values[field];
    if (isEmpty(value)) {
      return [field as string, 'This field is required'];
    }
    return undefined;
  };
};

type FormikValidationFunction<T> = (values: T) => FormikErrors<T>;

export type AnyValidationFunction =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((values: any) => FormikErrors<any>) | undefined;

export const validate = <T>(
  rules: ValidationRule<T>[]
): FormikValidationFunction<T> => {
  return (values: T) => {
    const errors: FormikErrors<T> = {};
    rules.forEach(rule => {
      const result = rule(values);
      if (result) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fieldErrors: string[] = (errors as any)[result[0]] || [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (errors as any)[result[0]] = fieldErrors.concat(result[1]);
      }
    });
    console.log('validation errors: ');
    console.log(errors);
    return errors;
  };
};
