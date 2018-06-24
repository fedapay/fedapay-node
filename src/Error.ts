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

    /**
     * Return true if response has error
     * @returns {boolean}
     */
    hasErrors(): boolean {
        return this.errors !== undefined && this.errors !== null;
    }

    /**
     * Fetch error from response body
     * @returns {void}
     */
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
