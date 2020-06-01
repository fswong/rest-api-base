import { IRestObject, IRestObjectType } from "./IRestObject";

export interface IRestRequest {
    type: IRestObjectType;
    data: Partial<IRestObject>;
}