import { IRestObject, IRestAction, isRestObject } from "../../../../base/src/models/rest/IRestObject";
import { IWebSocketNotification } from "../../../../base/src/models/rest/IWebSocketNotification";
import { IRestRequest } from "../../../../base/src/models/rest/IRestRequest";
import { RestApiService } from "../../services/rest/RestApiService";
import { IAuthenticatedActorService } from "../../../../base/src/models/interfaces/IAuthenticatedActorService";
import { IApiObjectFactory } from "../interfaces/IApiObjectFactory";
import { BehaviorSubject } from "rxjs";
import { IApiWebsSocketHandler } from "../interfaces/IApiWebSocketHandler";
import { ILoggingService } from "../../../../base/src/models/interfaces/ILoggingService";
import lodash from "lodash";

export abstract class ApiObjectBase {
    //#region params
    protected objectId: string | undefined;
    protected version: string | undefined;
    protected readonly objectType: string;
    protected initialized: boolean = false;
    protected apiObject: IRestObject | undefined;
    protected readonly apiObjectSubject: BehaviorSubject<IRestObject | undefined>;
    protected children: {[type: string]: ApiObjectBase | ApiObjectBase[] } | undefined;
    //#endregion params

    //#region ctor
    constructor(
        initializor: Partial<IRestObject> | IRestObject, 
        protected logger: ILoggingService,
        protected authenticatedActorService: IAuthenticatedActorService,
        protected instanceFactory: IApiObjectFactory,
        protected restApiService: RestApiService,
        protected notificationHandler: IApiWebsSocketHandler) {
            const instance = lodash.cloneDeep(initializor);
            this.objectId = instance.id;
            this.objectType = instance.type as string;
            this.apiObject = instance as IRestObject;
            this.apiObjectSubject = new BehaviorSubject<IRestObject | undefined>(instance as IRestObject);
        }
    //#endregion ctor

    //#region handlers
    async instance(): Promise<BehaviorSubject<IRestObject | undefined>> {
        await this.initialize();
        return this.apiObjectSubject;
    }

    id(): string | undefined {
        return this.objectId;
    }

    type(): string {
        return this.objectType;
    }

    getObject(): IRestObject {
        this.needsToBeInitialized();
        if (!this.apiObject) throw new Error("The object is not defined"); 

        // clone so we dont have to deal with mutation
        return lodash.cloneDeep(this.apiObject);
    }

    getActions(): IRestAction[] {
        this.needsToBeInitialized();
        if (!this.apiObject) throw new Error("The object is not defined"); 

        return this.apiObject.actions ? lodash.cloneDeep(this.apiObject.actions) : [];
    }

    getChildren(type: string): ApiObjectBase | ApiObjectBase[] | undefined {
        this.needsToBeInitialized();

        // dont need to clone this, they manage themselves
        return lodash.get(this.children, [type]);
    }

    destroy(): void {
        this.objectId = undefined;
        this.version = undefined;
        this.initialized = false;
        this.apiObject = undefined;
        this.apiObjectSubject.complete();
    }

    async notificationCallback(notification: IWebSocketNotification): Promise<void> {
        try {
            // check
        } catch (err) {
            this.logger.error("Failed to handle notification");
        }
    }

    async update(key: string, value: any) : Promise<IRestObject> {
        this.needsToBeInitialized();
        if (!this.apiObject) throw new Error("The object is not defined"); 

        return lodash.cloneDeep(this.apiObject);
    }

    // check that there the action is valid and then execute if valid
    async execute(action: IRestAction): Promise<IRestObject> {
        this.needsToBeInitialized();
        if (!this.apiObject) throw new Error("The object is not defined"); 

        return lodash.cloneDeep(this.apiObject);
    }

    async delete(): Promise<void> {
        this.needsToBeInitialized();
        if (!this.apiObject) throw new Error("The object is not defined"); 

        await this.restApiService.delete(
            await this.authenticatedActorService.getActiveActor(),
            this.apiObject);
        
    }
    //#endregion handlers

    //#region private
    protected async initialize(): Promise<void> {
        if (!this.apiObject) throw new Error("The object is not defined"); 

        if (!this.initialized) {
            const instance$ = (this.apiObject.id) ? this.get(this.apiObject) : this.create(this.apiObject);
            await this.updateAndBroadcast(await instance$);
        }
        
        await this.subscribeForUpdates();
    }

    protected updateAndBroadcast(instance: IRestObject): void {
        this.typeMustBeSimilar(instance.type, this.objectType);
        this.apiObject = lodash.cloneDeep(instance);
        if (!this.objectId) this.objectId = this.apiObject.id;
        this.version = this.apiObject.version;
        this.initialized = true;
        this.children = this.assignChildren(this.apiObject);
        this.apiObjectSubject.next(this.apiObject);
    }

    private async get(initializor: Partial<IRestObject>): Promise<IRestObject> {
        return await this.restApiService.get<IRestObject>(
            await this.authenticatedActorService.getActiveActor(),
            initializor
        );
    }

    private async create(initializor: Partial<IRestObject>): Promise<IRestObject> {
        return await this.restApiService.create<IRestObject>(
                await this.authenticatedActorService.getActiveActor(),
                initializor
            );
    }

    private assignChildren(instance: IRestObject): {[type: string]: ApiObjectBase | ApiObjectBase[] } | undefined {
        const keys = Object.keys(instance);
        const children = keys.map(key => {
            const value = lodash.get(instance, [key]);
            // undefined or falsy is definitely not an api object
            if (!value) {
                return undefined;
            }

            // if is an array need to check if they are api objects
            if (Array.isArray(value) && value.length > 0) {
                // fail early if not api object
                const isNotApiObject = value.some(arrayItem => !isRestObject(arrayItem));
                if (isNotApiObject) {
                    return undefined;
                }

                return [key, value.map(arrayItem => this.instanceFactory.create(arrayItem))];
            }

            // check if is a api object
            if (isRestObject(value)) {
                return [key, this.instanceFactory.create(value)];
            }

            return undefined;
        }).filter(child => child !== undefined);
        return children.length > 0 ? lodash.fromPairs(children as any) : undefined;
    }

    private async subscribeForUpdates() {
        try {
            if (!this.apiObject) throw new Error("The object is not defined");
            const url = await this.restApiService.getNotificationUrl(
                await this.authenticatedActorService.getActiveActor(),
                this.apiObject);
            this.notificationHandler.connect(url, this.notificationCallback);
        } catch (err) {
            this.logger.error("Failed to subscribe to updates.");
        }
    }

    private mapToRestRequest(obj: IRestObject): IRestRequest {
        return {
            type: obj.type,
            data: obj
        };
    }
    //#endregion private

    //#region validators
    protected needsToBeInitialized(): void {
        if (!this.initialized) throw new Error("The object needs to be initialized.");
    }

    protected typeMustBeSimilar(newType: string, previousType: string): void {
        if (newType !== previousType) throw new Error(`The type ${newType} does not match the existing type ${previousType}`);
    }
    //#endregion validators
}