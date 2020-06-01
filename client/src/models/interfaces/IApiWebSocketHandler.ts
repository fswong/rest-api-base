import { IWebSocketNotification } from "../../../../base/src/models/rest/IWebSocketNotification";

export interface IApiWebsSocketHandler {
    connect(address: string, callback: (notification: IWebSocketNotification) => Promise<any>): void;
    disconnect(): void;
}