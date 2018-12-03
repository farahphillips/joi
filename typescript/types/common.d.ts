import {Context} from "./any/validation-error";
import {AnySchema} from "./any";
import {ArraySchema} from "./array";
import {AlternativesSchema} from "./alternatives";
import {BinarySchema} from "./binary";
import {BooleanSchema} from "./boolean";
import {DateSchema} from "./date";
import {FunctionSchema} from "./function";
import {NumberSchema} from "./number";
import {ObjectSchema} from "./object";
import {StringSchema} from "./string";
import {LazySchema} from "./lazy";
import {Types} from "./root";
import {LanguageRootOptions} from "./root";

export interface ValidationOptions {
    /**
     * when true, stops validation on the first error, otherwise returns all the errors found. Defaults to true.
     */
    abortEarly?: boolean;
    /**
     * when true, attempts to cast values to the required types (e.g. a string to a number). Defaults to true.
     */
    convert?: boolean;
    /**
     * when true, allows object to contain unknown keys which are ignored. Defaults to false.
     */
    allowUnknown?: boolean;
    /**
     * when true, ignores unknown keys with a function value. Defaults to false.
     */
    skipFunctions?: boolean;
    /**
     * remove unknown elements from objects and arrays. Defaults to false
     * - when true, all unknown elements will be removed
     * - when an object:
     *      - objects - set to true to remove unknown keys from objects
     */
    stripUnknown?: boolean | { arrays?: boolean; objects?: boolean };
    /**
     * overrides individual error messages. Defaults to no override ({}).
     */
    language?: LanguageRootOptions;
    /**
     * sets the default presence requirements. Supported modes: 'optional', 'required', and 'forbidden'. Defaults to 'optional'.
     */
    presence?: 'optional' | 'required' | 'forbidden';
    /**
     * provides an external data set to be used in references
     */
    context?: Context;
    /**
     * when true, do not apply default values. Defaults to false.
     */
    noDefaults?: boolean;
}

export type SchemaLike = string | number | boolean | object | null | RegExp | Schema | SchemaMap;

export interface SchemaMap {
    [key: string]: SchemaLike | SchemaLike[];
}

export type Schema = AnySchema
    | ArraySchema
    | AlternativesSchema
    | BinarySchema
    | BooleanSchema
    | DateSchema
    | FunctionSchema
    | NumberSchema
    | ObjectSchema
    | StringSchema
    | LazySchema;

export interface Description {
    type?: Types | string;
    label?: string;
    description?: string;
    flags?: object;
    notes?: string[];
    tags?: string[];
    meta?: any[];
    example?: any[];
    valids?: any[];
    invalids?: any[];
    unit?: string;
    options?: ValidationOptions;

    [key: string]: any;
}
