interface Context {
    [key: string]: any;
    key?: string;
    label: string;
}

export interface ValidationErrorItem {
    message: string;
    type: string;
    path: string[];
    context: Context;
}

export type ValidationErrorFunction = (errors: ValidationErrorItem[]) => string | ValidationErrorItem | ValidationErrorItem[] | Error;

export interface ValidationError extends Error {
    isJoi: boolean;

    details: ValidationErrorItem[];

    annotate(): string;

    _object: any;
}
