export class Base {
    message: string;
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
        this.message = message;
        this.httpStatus = httpStatus;
        this.httpRequest = httpRequest;
        this.httpResponse = httpResponse;

        this.fetchErrors();
    }

    hasErrors() {
        return !this.errors;
    }

    fetchErrors() {
        if (this.httpResponse) {
            let data = this.httpResponse.data;

            if (data && data['message']) {
                this.errorMessage = data['message'];
            }

            if (data && data['errors']) {
                this.errors = data['errors'];
            }
        }
    }
}

export class ApiConnectionError extends Base { }

export class InvalidRequest extends Base { }
