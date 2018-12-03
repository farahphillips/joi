import {AnySchema} from "../any";
import {Reference} from "../ref";
import {WhenOptions, WhenSchemaOptions} from "../any/options";
import {SchemaLike} from "../common";
import {Schema} from "../common";

export interface AlternativesSchema extends AnySchema {
    try(types: SchemaLike[]): this;

    try(...types: SchemaLike[]): this;

    when(ref: string | Reference, options: WhenOptions): this;

    when(ref: Schema, options: WhenSchemaOptions): this;
}
