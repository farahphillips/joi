import {ValidationOptions} from "./common";

export interface Reference {
    (value: any, validationOptions: ValidationOptions): any;

    isJoi: boolean;

    isContext: boolean;
    key: string;
    path: string[];

    toString(): string;
}

export interface ReferenceOptions {
    separator?: string;
    contextPrefix?: string;
    default?: any;
    strict?: boolean;
    functions?: boolean;
}
