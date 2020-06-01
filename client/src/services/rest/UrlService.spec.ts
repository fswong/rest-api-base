import { UrlService } from "./UrlService";
import { instance, mock, when, verify, anyString } from "ts-mockito";
import { MockLoggingService } from "../mocks/MockLoggingService";
import { ILoggingService } from "../../../../base/src/models/interfaces/ILoggingService";
import { IRestObject } from "../../../../base/src/models/rest/IRestObject";

interface Context {
    loggingService: ILoggingService,
    underTest: UrlService;
}

function instantiate(): Context {
    const mockedLoggingService = mock(MockLoggingService);
    const loggingService: MockLoggingService = instance(mockedLoggingService);
    return {
        loggingService: mockedLoggingService,
        underTest: new UrlService(loggingService)
    }
}

describe("UrlService", () => {
    const configuration = {baseUrl: "fake.url"};
    describe("constructUrl", () => {
        it("should build url with id", () => {
            const context = instantiate();
            const demoApiObject = {
                id: "undertest",
                type: "demo",
            } as IRestObject;
            const expectedResult = `${configuration.baseUrl}/${demoApiObject.type}/${demoApiObject.id}`;
            
            const url = context.underTest.constructUrl(configuration, demoApiObject);
            expect(url).toEqual(expectedResult);
        });
        it("should build url without id", () => {
            const context = instantiate();
            const demoApiObject = {
                type: "demo",
            } as IRestObject;
            const expectedResult = `${configuration.baseUrl}/${demoApiObject.type}`;
            
            const url = context.underTest.constructUrl(configuration, demoApiObject);
            expect(url).toEqual(expectedResult);
        });
        it("should build url with parents", () => {
            const context = instantiate();
            const tier1ParentDemoApiObject = {
                id: "parent1",
                type: "tier1Parent"
            } as IRestObject;
            const tier2ParentDemoApiObject = {
                id: "parent2",
                type: "tier2Parent",
                parents: [
                    {
                        id: tier1ParentDemoApiObject.id,
                        type: tier1ParentDemoApiObject.type
                    }
                ]
            } as IRestObject;
            const demoApiObject = {
                id: "undertest",
                type: "demo",
                parents: [
                    {
                        id: tier1ParentDemoApiObject.id,
                        type: tier1ParentDemoApiObject.type
                    },
                    {
                        id: tier2ParentDemoApiObject.id,
                        type: tier2ParentDemoApiObject.type
                    }
                ]
            } as IRestObject;
            const expectedResult = `${configuration.baseUrl}/${tier1ParentDemoApiObject.type}/${tier1ParentDemoApiObject.id}/${tier2ParentDemoApiObject.type}/${tier2ParentDemoApiObject.id}/${demoApiObject.type}/${demoApiObject.id}`;
            
            const url = context.underTest.constructUrl(configuration, demoApiObject);
            expect(url).toEqual(expectedResult);
        });
    });
    describe("constructListUrl", () => {
        it("should construct url for list", () => {
            const context = instantiate();
            const configuration = { baseUrl: "base" };
            const type = "type";
            const url = context.underTest.constructListUrl(configuration, type);
            expect(url).toEqual("base/type");
        });
        it("should construct url for list with parents", () => {
            const context = instantiate();
            const configuration = { baseUrl: "base" };
            const type = "type";
            const tier1ParentDemoApiObject = {
                id: "parent1",
                type: "tier1Parent"
            } as IRestObject;
            const tier2ParentDemoApiObject = {
                id: "parent2",
                type: "tier2Parent",
                parents: [
                    {
                        id: tier1ParentDemoApiObject.id,
                        type: tier1ParentDemoApiObject.type
                    }
                ]
            } as IRestObject;
            const parents = [
                {
                    id: tier1ParentDemoApiObject.id,
                    type: tier1ParentDemoApiObject.type
                },
                {
                    id: tier2ParentDemoApiObject.id,
                    type: tier2ParentDemoApiObject.type
                }
            ];
            const url = context.underTest.constructListUrl(configuration, type, parents);
            expect(url).toEqual("base/tier1Parent/parent1/tier2Parent/parent2/type");
        });
    });
});