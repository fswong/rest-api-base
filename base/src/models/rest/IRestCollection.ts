import { IRestObject, IRestObjectType } from "./IRestObject";
import { IRestResponse } from "./IRestResponse";

export interface IRestCollection<T extends IRestObject> extends IRestResponse {
    type: IRestObjectType;
    total: number;
    collection: T[];
}
