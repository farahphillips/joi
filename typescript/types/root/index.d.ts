import {AnySchema} from "../any";
import {ArraySchema} from "../array";
import {BooleanSchema} from "../boolean";
import {BinarySchema} from "../binary";
import {DateSchema} from "../date";
import {FunctionSchema} from "../function";
import {NumberSchema} from "../number";
import {ObjectSchema} from "../object";
import {StringSchema} from "../string";
import {SymbolSchema} from "../symbol";
import {AlternativesSchema} from "../alternatives";
import {LazyOptions} from "../lazy/options";
import {LazySchema} from "../lazy";
import {ValidationResult} from "../any/validation-result";
import {Context, ValidationError} from "../any/validation-error";
import {Reference, ReferenceOptions} from "../ref";
import {Description, Schema, SchemaLike, SchemaMap, ValidationOptions} from "../common";

export type Types =
    'any'
    | 'alternatives'
    | 'array'
    | 'boolean'
    | 'binary'
    | 'date'
    | 'function'
    | 'lazy'
    | 'number'
    | 'object'
    | 'string'
    | 'symbol';
export type LanguageOptions = string | boolean | null | {
    [key: string]: LanguageOptions;
};
export type LanguageRootOptions = {
    root?: string;
    key?: string;
    messages?: { wrapArrays?: boolean; };
} & Partial<Record<Types, LanguageOptions>> & { [key: string]: LanguageOptions; };

export interface State {
    key?: string;
    path?: Array<string | number>;
    parent?: any;
    reference?: any;
}

export type ExtensionBoundSchema = Schema & {
    /**
     * Creates a joi error object.
     * Used in conjunction with custom rules.
     * @param type - the type of rule to create the error for.
     * @param context - provide properties that will be available in the `language` templates.
     * @param state - should the context passed into the `validate` function in a custom rule
     * @param options - should the context passed into the `validate` function in a custom rule
     */
    createError(type: string, context: Context, state: State, options: ValidationOptions): Err;
};

export interface Rules<P extends object = any> {
    name: string;
    params?: ObjectSchema | { [key in keyof P]: SchemaLike; };

    setup?(this: ExtensionBoundSchema, params: P): Schema | void;

    validate?(this: ExtensionBoundSchema, params: P, value: any, state: State, options: ValidationOptions): any;

    description?: string | ((params: P) => string);
}

export interface Extension {
    name: string;
    base?: Schema;
    language?: LanguageOptions;

    coerce?(this: ExtensionBoundSchema, value: any, state: State, options: ValidationOptions): any;

    pre?(this: ExtensionBoundSchema, value: any, state: State, options: ValidationOptions): any;

    describe?(this: Schema, description: Description): Description;

    rules?: Rules[];
}

export interface Err {
    isJoi: boolean;

    toString(): string;
}

export interface Joi extends AnySchema {

    /**
     * Current version of the joi package.
     */
    version: string;

    /**
     * Generates a schema object that matches any data type.
     */
    any(): AnySchema;

    /**
     * Generates a schema object that matches an array data type.
     */
    array(): ArraySchema;

    /**
     * Generates a schema object that matches a boolean data type (as well as the strings 'true', 'false', 'yes', and 'no'). Can also be called via bool().
     */
    bool(): BooleanSchema;

    boolean(): BooleanSchema;

    /**
     * Generates a schema object that matches a Buffer data type (as well as the strings which will be converted to Buffers).
     */
    binary(): BinarySchema;

    /**
     * Generates a schema object that matches a date type (as well as a JavaScript date string or number of milliseconds).
     */
    date(): DateSchema;

    /**
     * Generates a schema object that matches a function type.
     */
    func(): FunctionSchema;

    /**
     * Generates a schema object that matches a number data type (as well as strings that can be converted to numbers).
     */
    number(): NumberSchema;

    /**
     * Generates a schema object that matches an object data type (as well as JSON strings that have been parsed into objects).
     */
    object(schema?: SchemaMap): ObjectSchema;

    /**
     * Generates a schema object that matches a string data type. Note that empty strings are not allowed by default and must be enabled with allow('').
     */
    string(): StringSchema;

    /**
     * Generates a schema object that matches any symbol.
     */
    symbol(): SymbolSchema;

    /**
     * Generates a type that will match one of the provided alternative schemas
     */
    alternatives(types: SchemaLike[]): AlternativesSchema;

    alternatives(...types: SchemaLike[]): AlternativesSchema;

    /**
     * Alias for `alternatives`
     */
    alt(types: SchemaLike[]): AlternativesSchema;

    alt(...types: SchemaLike[]): AlternativesSchema;

    /**
     * Generates a placeholder schema for a schema that you would provide with the fn.
     * Supports the same methods of the any() type.
     * This is mostly useful for recursive schemas
     */
    lazy(cb: () => Schema, options?: LazyOptions): LazySchema;

    /**
     * Validates a value using the given schema and options.
     */
    validate<T>(value: T, schema: SchemaLike, options?: ValidationOptions): ValidationResult<T>;

    validate<T, R>(value: T, schema: SchemaLike, callback: (err: ValidationError, value: T) => R): R;

    validate<T, R>(value: T, schema: SchemaLike, options: ValidationOptions, callback: (err: ValidationError, value: T) => R): R;

    /**
     * Converts literal schema definition to joi schema object (or returns the same back if already a joi schema object).
     */
    compile(schema: SchemaLike): Schema;

    /**
     * Validates a value against a schema and throws if validation fails.
     *
     * @param value - the value to validate.
     * @param schema - the schema object.
     * @param message - optional message string prefix added in front of the error message. may also be an Error object.
     */
    assert(value: any, schema: SchemaLike, message?: string | Error): void;

    /**
     * Validates a value against a schema, returns valid object, and throws if validation fails where:
     *
     * @param value - the value to validate.
     * @param schema - the schema object.
     * @param message - optional message string prefix added in front of the error message. may also be an Error object.
     */
    attempt<T>(value: T, schema: SchemaLike, message?: string | Error): T;

    /**
     * Generates a reference to the value of the named key.
     */
    ref(key: string, options?: ReferenceOptions): Reference;

    /**
     * Checks whether or not the provided argument is a reference. It's especially useful if you want to post-process error messages.
     */
    isRef(ref: any): ref is Reference;

    /**
     * Get a sub-schema of an existing schema based on a `path` that can be either a string or an array
     * of strings For string values path separator is a dot (`.`)
     */
    reach(schema: ObjectSchema, path: string | string[]): Schema;

    /**
     * Creates a new Joi instance customized with the extension(s) you provide included.
     */
    extend(extension: Extension | Extension[], ...extensions: Array<Extension | Extension[]>): any;

    /**
     * Creates a new Joi instance that will apply defaults onto newly created schemas
     * through the use of the fn function that takes exactly one argument, the schema being created.
     *
     * @param fn - The function must always return a schema, even if untransformed.
     */
    defaults(fn: (root: Schema) => Schema): Joi;
}
