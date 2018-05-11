export class Base extends Error {
    
    httpStatus: any;
    httpRequest: any;
    httpResponse: any;
    errorMessage: any;
    errors: any;

    constructor(
        message: string,
        httpStatus = null,
        httpRequest = null,
        httpResponse = null
    ) {
        super(message);
        this.httpStatus = httpStatus;
        this.httpRequest = httpRequest;
        this.httpResponse = httpResponse;
    }

    getHttpStatus() {
        return this.httpStatus;
    }

    getHttpRequest() {
        return this.httpRequest;
    }

    getHttpResponse() {
        return this.httpResponse;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    getErrors() {
        return this.errors;
    }

    hasErrors() {
        return !this.errors;
    }
}