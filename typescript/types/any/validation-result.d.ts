import {ValidationError} from "./validation-error";

export interface ValidationResult<T> extends Pick<Promise<T>, 'then' | 'catch'> {
    error: ValidationError;
    value: T;
}
