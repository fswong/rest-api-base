import { RestApiService } from "../rest/RestApiService";
import { IApiObjectFactory } from "../../models/interfaces/IApiObjectFactory";
import { IRestObject, IRestObjectType } from "../../../../base/src/models/rest/IRestObject";
import { IRestCollection } from "../../../../base/src/models/rest/IRestCollection";
import { ApiObjectBase } from "../../models/api/ApiObjectBase";
import { IAuthenticatedActorService } from "../../../../base/src/models/interfaces/IAuthenticatedActorService";

export class ApiObjectServiceBase {
    constructor(
        private authenticatedActorService: IAuthenticatedActorService,
        private restApiService: RestApiService,
        private factory: IApiObjectFactory
    ) {}

    async list<T extends IRestObject>(type: IRestObjectType, params?: { [key: string]: string | string[] }): Promise<IRestCollection<T>> {
        const actor = await this.authenticatedActorService.getActiveActor();
        const meta = await this.restApiService.getMeta(actor, type);
        const parents = meta.parents || [];
        return await this.restApiService.list<T>(actor, type, params, parents);
    }

    instantiate(restObject: Partial<IRestObject>): ApiObjectBase {
        return this.factory.create(restObject);
    }

    create(type: IRestObjectType, id?: string): ApiObjectBase {
        const object = { type, id, initialized: false } as Partial<IRestObject>;
        return this.instantiate(object);
    }
}
