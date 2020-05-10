export interface IRestObject {
    id: string;
    type: IRestObjectType;
    parents?: IRestObjectParent[];
    actions?: IRestAction[];
    expanded: boolean;
}

export type IRestObjectType = string;

export interface IRestObjectParent {
    id: string;
    type: IRestObjectType;
}

export interface IRestAction {
    name: string;
}