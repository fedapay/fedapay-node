export declare class Webhook {
    readonly DEFAULT_TOLERANCE: 300;
    static constructEvent(payload: any, header: any, secret: any, tolerance: any): any;
}
export declare class WebhookSignature {
    protected _computeSignature(payload: any, secret: any): any;
    parseHeader(header: any, scheme: string): {
        timestamp: number;
        signatures: any[];
    };
    verifyHeader(payload: any, header: any, secret: any, tolerance: any): boolean;
}
