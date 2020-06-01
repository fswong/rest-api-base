import { IRestObjectType, IRestObject } from "../../../../base/src/models/rest/IRestObject";
import { ApiObjectBase } from "./ApiObjectBase";
import { MockLoggingService } from "../../services/mocks/MockLoggingService";
import { MockApiObjectFactory } from "../../services/mocks/MockApiObjectFactory";
import { IApiWebsSocketHandler } from "../interfaces/IApiWebSocketHandler";
import { MockAuthenticatedActorService } from "../../services/mocks/MockAuthenticatedActorService";
import { RestApiService } from "../../services/rest/RestApiService";
import { instance, mock, when, verify, anyString } from "ts-mockito";

class ApiObject extends ApiObjectBase {}

interface Context {
    logger: MockLoggingService,
    authenticatedActorService: MockAuthenticatedActorService,
    instanceFactory: MockApiObjectFactory,
    restApiService: RestApiService,
    notificationHandler: IApiWebsSocketHandler,
    underTest: ApiObjectBase;
}

function initialize(obj: Partial<IRestObject>): Context {
    const mockedLoggingService = mock(MockLoggingService);
    const mockedAuthenticatedActorService = mock(MockAuthenticatedActorService);
    const mockedApiObjectFactory = mock(MockApiObjectFactory);
    const mockedRestApiService = mock(RestApiService);
    const mockedApiWebsSocketHandler = mock(MockLoggingService);
    const logger: MockLoggingService = instance(mockedLoggingService);
    const authenticatedActorService = instance(mockedAuthenticatedActorService),
    const instanceFactory = instance(mockedApiObjectFactory),
    const restApiService = instance(mockedRestApiService),
    const notificationHandler = instance(mockedApiWebsSocketHandler),
    return {
        logger: mockedLoggingService,
        authenticatedActorService: mockedAuthenticatedActorService,
        instanceFactory:,
        restApiService:,
        notificationHandler:,
        underTest: new ApiObject(
            obj,
            logger,
            authenticatedActorService,
            instanceFactory,
            restApiService,
            notificationHandler
            )
    }
}

describe("ApiObjectBase", () => {
    describe("should create", () => {

    });
});