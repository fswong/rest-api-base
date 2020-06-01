import { IAuthenticatedActorService } from "../../../../base/src/models/interfaces/IAuthenticatedActorService";

export class MockAuthenticatedActorService implements IAuthenticatedActorService {
    getActiveActor(): Promise<import("../../../../base/src/models/common/IActor").IActor> {
        throw new Error("Method not implemented.");
    }
}