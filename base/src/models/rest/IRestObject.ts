import { IRestResponse } from "./IRestResponse";

export interface IRestObject extends IRestResponse {
    id: string;
    type: IRestObjectType;
    version?: string;
    parents?: IRestObjectParent[];
    actions?: IRestAction[];
    expand?: string[];
    initialized: boolean;
}

export type IRestObjectType = string;

export interface IRestObjectParent {
    id: string;
    type: IRestObjectType;
}

export interface IRestAction {
    name: string;
}

export const isRestObject = (obj: IRestObject): obj is IRestObject => {
    return typeof obj.type !== 'undefined' && typeof obj.initialized !== 'undefined';
}