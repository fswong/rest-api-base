import { IActor } from "../common/IActor";

export interface IAuthenticatedActorService {
    getActiveActor(): Promise<IActor>;
}