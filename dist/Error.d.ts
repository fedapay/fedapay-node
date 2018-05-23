export declare class Base {
    message: string;
    httpStatus: any;
    httpRequest: any;
    httpResponse: any;
    errorMessage: any;
    errors: any;
    constructor(message: string, httpStatus?: any, httpRequest?: any, httpResponse?: any);
    hasErrors(): boolean;
    fetchErrors(): void;
}
export declare class ApiConnectionError extends Base {
}
export declare class InvalidRequest extends Base {
}
