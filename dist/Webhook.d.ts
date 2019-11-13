export declare class Webhook {
    static DEFAULT_TOLERANCE: number;
    static constructEvent(payload: any, header: any, secret: any, tolerance?: any): any;
    /**
   * Generates a header to be used for webhook mocking
   *
   * @typedef {object} opts
   * @property {number} timestamp - Timestamp of the header. Defaults to Date.now()
   * @property {string} payload - JSON stringified payload object, containing the 'id' and 'object' parameters
   * @property {string} secret - FedaPay webhook secret 'wh_...'
   * @property {string} scheme - Version of API to hit. Defaults to 'v1'.
   * @property {string} signature - Computed webhook signature
   */
    static generateTestHeaderString(opts?: any): string;
}
export declare class WebhookSignature {
    static EXPECTED_SCHEME: string;
    static computeSignature(payload: any, secret: any): string;
    protected static parseHeader(header: any, scheme: string): {
        timestamp: number;
        signatures: any[];
    };
    static verifyHeader(payload: any, header: any, secret: any, tolerance?: any): boolean;
}
