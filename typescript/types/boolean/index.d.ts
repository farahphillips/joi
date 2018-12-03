import {AnySchema} from "../any";

export interface BooleanSchema extends AnySchema {
    /**
     * Allows for additional values to be considered valid booleans by converting them to true during validation.
     * Accepts a value or an array of values. String comparisons are by default case insensitive,
     * see boolean.insensitive() to change this behavior.
     * @param values - strings, numbers or arrays of them
     */
    truthy(...values: Array<string | number | string[] | number[]>): this;

    /**
     * Allows for additional values to be considered valid booleans by converting them to false during validation.
     * Accepts a value or an array of values. String comparisons are by default case insensitive,
     * see boolean.insensitive() to change this behavior.
     * @param values - strings, numbers or arrays of them
     */
    falsy(...values: Array<string | number | string[] | number[]>): this;

    /**
     * Allows the values provided to truthy and falsy as well as the "true" and "false" default conversion
     * (when not in strict() mode) to be matched in a case insensitive manner.
     * @param enabled
     */
    insensitive(enabled?: boolean): this;
}
