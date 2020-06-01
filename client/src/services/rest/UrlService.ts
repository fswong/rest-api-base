import { IRestObject, IRestAction, IRestObjectType, IRestObjectParent } from "../../../../base/src/models/rest/IRestObject";
import { IConfiguration } from "../../../../base/src/models/configurations/IConfiguration";
import { ILoggingService } from "../../../../base/src/models/interfaces/ILoggingService";

export class UrlService {
    constructor(private logger: ILoggingService) {}
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
        
        return `${restObjectUrl}/action/${actionName}`;
    }

    constructListUrl(configuration: IConfiguration, type: IRestObjectType, parents?: IRestObjectParent[]): string {
        const parentsFragment = Array.isArray(parents) ? parents.reduce((acc, next) => {
            return `${acc}/${next.type}/${next.id}`
        }, '') : '';
    
        return `${configuration.baseUrl}${parentsFragment}/${type}`;
    }

    constructMetaUrl(configuration: IConfiguration, type: IRestObjectType): string {
        return `${configuration.baseUrl}/${type}/meta`;
    }

    constructSocketUrl(configuration: IConfiguration, restObject: IRestObject): string {
        throw new Error("Method not implemented");
    }
}