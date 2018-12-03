import {AnySchema} from "../any";
import {Reference} from "../ref";
import {SchemaLike} from "../common";

export interface ArraySchema extends AnySchema {
    /**
     * Allow this array to be sparse.
     * enabled can be used with a falsy value to go back to the default behavior.
     */
    sparse(enabled?: any): this;

    /**
     * Allow single values to be checked against rules as if it were provided as an array.
     * enabled can be used with a falsy value to go back to the default behavior.
     */
    single(enabled?: any): this;

    /**
     * List the types allowed for the array values.
     * type can be an array of values, or multiple values can be passed as individual arguments.
     * If a given type is .required() then there must be a matching item in the array.
     * If a type is .forbidden() then it cannot appear in the array.
     * Required items can be added multiple times to signify that multiple items must be found.
     * Errors will contain the number of items that didn't match.
     * Any unmatched item having a label will be mentioned explicitly.
     *
     * @param type - a joi schema object to validate each array item against.
     */
    items(...types: SchemaLike[]): this;

    items(types: SchemaLike[]): this;

    /**
     * Lists the types in sequence order for the array values where:
     * @param type - a joi schema object to validate against each array item in sequence order. type can be an array of values, or multiple values can be passed as individual arguments.
     * If a given type is .required() then there must be a matching item with the same index position in the array.
     * Errors will contain the number of items that didn't match.
     * Any unmatched item having a label will be mentioned explicitly.
     */
    ordered(...types: SchemaLike[]): this;

    ordered(types: SchemaLike[]): this;

    /**
     * Specifies the minimum number of items in the array.
     */
    min(limit: number): this;

    /**
     * Specifies the maximum number of items in the array.
     */
    max(limit: number): this;

    /**
     * Specifies the exact number of items in the array.
     */
    length(limit: number | Reference): this;

    /**
     * Requires the array values to be unique.
     * Be aware that a deep equality is performed on elements of the array having a type of object,
     * a performance penalty is to be expected for this kind of operation.
     */
    unique(comparator?: string): this;

    unique<T = any>(comparator?: (a: T, b: T) => boolean): this;
}
