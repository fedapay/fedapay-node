export declare class Base extends Error {
    httpStatus: any;
    httpRequest: any;
    httpResponse: any;
    errorMessage: any;
    errors: any;
    constructor(message: string, httpStatus?: null, httpRequest?: null, httpResponse?: null);
    getHttpStatus(): any;
    getHttpRequest(): any;
    getHttpResponse(): any;
    getErrorMessage(): any;
    getErrors(): any;
    hasErrors(): boolean;
}
