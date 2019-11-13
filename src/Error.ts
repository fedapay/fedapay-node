export class Base {
    errorMessage: any;
    errors: any;

    constructor(
        public message: string,
        public httpStatus = null,
        public httpRequest = null,
        public httpResponse = null
    ) {
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

export class SignatureVerificationError extends Base {
    constructor(
        message: string,
        public sigHeader = null,
        httpBody = null
    ) {
        super(message, null, null, httpBody)
    }
}
