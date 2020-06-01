import { IApiWebsSocketHandler } from "../../models/interfaces/IApiWebSocketHandler";

export class MockApiWebSocketHandler implements IApiWebsSocketHandler {
    connect(address: string, callback: (notification: import("../../../../base/src/models/rest/IWebSocketNotification").IWebSocketNotification) => Promise<any>): void {
        throw new Error("Method not implemented.");
    }
    disconnect(): void {
        throw new Error("Method not implemented.");
    }
};