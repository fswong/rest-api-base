import { IRestObjectType } from "./IRestObject";

export interface IWebSocketNotification {
    id: string;
    type: IRestObjectType;
    version: string;
}