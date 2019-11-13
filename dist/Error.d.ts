export declare class Base {
    message: string;
    httpStatus: any;
    httpRequest: any;
    httpResponse: any;
    errorMessage: any;
    errors: any;
    constructor(message: string, httpStatus?: any, httpRequest?: any, httpResponse?: any);
    /**
     * Return true if response has error
     * @returns {boolean}
     */
    hasErrors(): boolean;
    /**
     * Fetch error from response body
     * @returns {void}
     */
    fetchErrors(): void;
}
export declare class ApiConnectionError extends Base {
}
export declare class InvalidRequest extends Base {
}
export declare class SignatureVerificationError extends Base {
    sigHeader: any;
    constructor(message: string, sigHeader?: any, httpBody?: any);
}
