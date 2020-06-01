import { IRestObject } from "../../../../base/src/models/rest/IRestObject";
import { ApiObjectBase } from "../api/ApiObjectBase";

export interface IApiObjectFactory {
    create(obj: Partial<IRestObject>): ApiObjectBase;
}