import { IRestObject, IRestObjectType } from "./IRestObject";

export interface IRestCollection<T extends IRestObject> {
    type: IRestObjectType;
    collection: T[];
}
