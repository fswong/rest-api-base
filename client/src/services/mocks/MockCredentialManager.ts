import { ICredentialManager } from "../../../../base/src/models/interfaces/ICredentialManager";

export class MockCredentialManager implements ICredentialManager {
    getIdentifiers(actor: import("../../../../base/src/models/common/IActor").IActor): Promise<{ [key: string]: string; }> {
        throw new Error("Method not implemented.");
    }
}