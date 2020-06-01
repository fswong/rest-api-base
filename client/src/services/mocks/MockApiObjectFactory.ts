import { IApiObjectFactory } from "../../models/interfaces/IApiObjectFactory";

export class MockApiObjectFactory implements IApiObjectFactory {
    create(obj: import("../../../../base/src/models/rest/IRestObject").IRestObject): import("../../models/api/ApiObjectBase").ApiObjectBase {
        throw new Error("Method not implemented.");
    }
    
}