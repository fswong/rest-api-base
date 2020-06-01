import { IHttpClient } from "../../../../base/src/models/interfaces/IHttpClient";
import { ILoggingService } from "../../../../base/src/models/interfaces/ILoggingService";
import { IConfiguration } from "../../../../base/src/models/configurations/IConfiguration";
import { IRestObject, IRestObjectType, IRestAction, IRestObjectParent } from "../../../../base/src/models/rest/IRestObject";
import { IRestCollection } from "../../../../base/src/models/rest/IRestCollection";
import { UrlService } from "./UrlService";
import { HeaderService } from "./HeaderService";
import { ICredentialManager } from "../../../../base/src/models/interfaces/ICredentialManager";
import { IActor } from "../../../../base/src/models/common/IActor";

export class RestApiService {
    constructor(
        private logger: ILoggingService,
        private httpClient: IHttpClient, 
        private urlService: UrlService, 
        private headerService: HeaderService, 
        private credentialManager: ICredentialManager,
        private configuration: IConfiguration
        ) {}

    async get<T extends IRestObject>(actor: IActor, obj: Partial<T>, params?: {[key: string]: any}): Promise<T> {
        const { url, formattedParams, formattedOptions } = await this.getHeaders(actor, obj, params);
        return await this.httpClient.get<T>(url, formattedOptions, formattedParams);
    }

    async getMeta<T extends IRestObject>(actor: IActor, type: IRestObjectType): Promise<Partial<T>> {
        const url = this.urlService.constructMetaUrl(this.configuration, type);
        const credentials = await this.credentialManager.getIdentifiers(actor);
        const formattedOptions = this.headerService.buildOptions(this.configuration, credentials);
        return await this.httpClient.get<T>(url, formattedOptions);
    }

    async create<T extends IRestObject>(actor: IActor, obj: Partial<T>, params?: {[key: string]: any}): Promise<T> {
        const { url, formattedParams, formattedOptions } = await this.getHeaders(actor, obj, params);
        return await this.httpClient.post<T>(url, obj, formattedOptions, formattedParams);
    }

    async update<T extends IRestObject>(actor: IActor, obj: Partial<T>, params?: {[key: string]: any}): Promise<T> {
        const { url, formattedParams, formattedOptions } = await this.getHeaders(actor, obj, params);
        return await this.httpClient.put<T>(url, obj, formattedOptions, formattedParams);
    }

    async execute<T extends IRestObject>(actor: IActor, obj: Partial<T>, action: IRestAction, params?: {[key: string]: any}): Promise<T> {
        const { url, formattedParams, formattedOptions } = await this.getHeaders(actor, obj, params, action);
        return await this.httpClient.post<T>(url, obj, formattedOptions, formattedParams);
    }

    async delete(actor: IActor, obj: Partial<IRestObject>): Promise<void> {
        const { url, formattedOptions } = await this.getHeaders(actor, obj);
        return await this.httpClient.delete(url, formattedOptions);
    }

    async list<T extends IRestObject>(actor: IActor, type: IRestObjectType, params?: {[key:string]: string | string[]}, parents?: IRestObjectParent[]): Promise<IRestCollection<T>> {
        const url = this.urlService.constructListUrl(this.configuration, type, parents);
        const formattedParams = this.headerService.buildParams(params);
        const credentials = await this.credentialManager.getIdentifiers(actor);
        const formattedOptions = this.headerService.buildOptions(this.configuration, credentials);
        return await this.httpClient.list<T>(url, formattedOptions, formattedParams);
    }

    // TODO
    getNotificationUrl<T extends IRestObject>(actor: IActor, obj: Partial<T>): string {
        throw new Error("Method not implemented");
    }

    private getUrl(obj: Partial<IRestObject>, action?: IRestAction): string {
        return this.urlService.constructUrl(this.configuration, obj, action);
    }

    private async getHeaders(actor: IActor, obj: Partial<IRestObject>, params?: {[key: string]: any}, action?: IRestAction): 
    Promise<{url: string; formattedOptions: {[key: string]: string | boolean}, formattedParams: {[key: string]: string | boolean} | undefined}> {
        const url = this.getUrl(obj, action);
        const formattedParams = this.headerService.buildParams(params);
        const credentials = await this.credentialManager.getIdentifiers(actor);
        const formattedOptions = this.headerService.buildOptions(this.configuration, credentials);
        return {url, formattedParams, formattedOptions};
    }
}