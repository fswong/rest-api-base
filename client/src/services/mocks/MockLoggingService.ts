import { ILoggingService } from "../../../../base/src/models/interfaces/ILoggingService";

export class MockLoggingService implements ILoggingService {
    debug(messages: any): void {
        throw new Error("Method not implemented.");
    }
    info(messages: any): void {
        throw new Error("Method not implemented.");
    }
    warn(messages: any): void {
        throw new Error("Method not implemented.");
    }
    error(messages: any): void {
        throw new Error("Method not implemented.");
    }
}