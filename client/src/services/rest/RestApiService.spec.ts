import { RestApiService } from "./RestApiService";
import { IHttpClient } from "../../../../base/src/models/interfaces/IHttpClient";
import { UrlService } from "./UrlService";
import { HeaderService } from "./HeaderService";
import { ILoggingService } from "../../../../base/src/models/interfaces/ILoggingService";
import { ICredentialManager } from "../../../../base/src/models/interfaces/ICredentialManager";
import { IConfiguration } from "../../../../base/src/models/configurations/IConfiguration";
import { instance, mock, when, verify, anyString } from "ts-mockito";
import { MockCredentialManager } from "../mocks/MockCredentialManager";
import { MockHttpClient } from "../mocks/MockHttpClient";
import { MockLoggingService } from "../mocks/MockLoggingService";

interface Context {
    httpClient: IHttpClient;
    urlService: UrlService;
    headerService: HeaderService;
    logger: ILoggingService;
    credentialManager: ICredentialManager;
    configuration: IConfiguration;
    underTest: RestApiService;
}

function instantiate(): Context {
    const mockHttpClient = mock(MockHttpClient);
    const mockUrlService = mock(UrlService);
    const mockHeaderService = mock(HeaderService);
    const mockLogger = mock(MockLoggingService);
    const mockCredentailManager = mock(MockCredentialManager);
    const configuration = {} as IConfiguration;

    const httpClient = instance(mockHttpClient);
    const urlService = instance(mockUrlService);
    const headerService = instance(mockHeaderService);
    const logger = instance(mockLogger);
    const credentialManager = instance(mockCredentailManager);
    return {
        httpClient,
        urlService,
        headerService,
        logger,
        credentialManager,
        configuration,
        underTest: new RestApiService(
            httpClient,
            urlService,
            headerService,
            logger,
            credentialManager,
            configuration
        )
    }
}

describe("RestApiService", () => {
    describe("get", () => {});
    describe("create", () => {});
    describe("update", () => {});
    describe("execute", () => {});
    describe("delete", () => {});
    describe("list", () => {});
});