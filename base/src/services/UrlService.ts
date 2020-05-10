import { IRestObject, IRestAction, IRestObjectType, IRestObjectParent } from "../models/rest/IRestObject";
import { IConfiguration } from "../models/configurations/IConfiguration";

export class UrlService {
    constructUrl(configuration: IConfiguration, restObject: Partial<IRestObject>, action?: IRestAction): string {
        const id = restObject.id;
        const type = restObject.type;

        if (!type) {
            throw new Error("No type provided");
        }
        const parents = Array.isArray(restObject.parents) ? restObject.parents : [];

        const parentsFragment = parents.reduce((acc, next) => {
            return `${acc}/${next.type}/${next.id}`
        }, '');

        const restObjectUrl = id ? `${configuration.baseUrl}${parentsFragment}/${type}/${id}` 
        : `${configuration.baseUrl}${parentsFragment}/${type}`;

        if (!action) {
            return restObjectUrl;
        }

        const actionName = action.name;
        if (!action.name) {
            throw new Error("No type provided");
        }
        
        return `${restObjectUrl}/${actionName}`;
    }

    constructListUrl(configuration: IConfiguration, type: IRestObjectType, parents?: IRestObjectParent[]): string {
        const parentsFragment = Array.isArray(parents) ? parents.reduce((acc, next) => {
            return `${acc}/${next.type}/${next.id}`
        }, '') : '';
    
        return `${configuration.baseUrl}${parentsFragment}/${type}`;
    }
}