import { instance, mock, when, verify, anyString } from "ts-mockito";
import { MockLoggingService } from "../mocks/MockLoggingService";
import { ILoggingService } from "../../../../base/src/models/interfaces/ILoggingService";
import { HeaderService } from "./HeaderService";

interface Context {
    loggingService: ILoggingService,
    underTest: HeaderService;
}

function instantiate(): Context {
    const mockedLoggingService = mock(MockLoggingService);
    const loggingService: MockLoggingService = instance(mockedLoggingService);
    return {
        loggingService: mockedLoggingService,
        underTest: new HeaderService(loggingService)
    }
}

describe("HeaderService", () => {
    describe("buildOptions", () => {});
    describe("buildParams", () => {});
});