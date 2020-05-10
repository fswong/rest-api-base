import { IActor } from "../common/IActor";

export interface ICredentialManager {
    getIdentifiers(actor: IActor): Promise<{[key: string]: string}>;
}
