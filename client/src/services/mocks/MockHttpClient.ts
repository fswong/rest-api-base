import { IHttpClient } from "../../../../base/src/models/interfaces/IHttpClient";

export class MockHttpClient implements IHttpClient {
    get<T extends import("../../../../base/src/models/rest/IRestObject").IRestObject>(url: string, options: { [key: string]: string | boolean; }, params?: { [key: string]: string | boolean; } | undefined): Promise<T> {
        throw new Error("Method not implemented.");
    }
    list<T extends import("../../../../base/src/models/rest/IRestObject").IRestObject>(url: string, options: { [key: string]: string | boolean; }, params?: { [key: string]: string | boolean; } | undefined): Promise<import("../../../../base/src/models/rest/IRestCollection").IRestCollection<T>> {
        throw new Error("Method not implemented.");
    }
    post<T extends import("../../../../base/src/models/rest/IRestObject").IRestObject>(url: string, obj: Partial<T>, options: { [key: string]: string | boolean; }, params?: { [key: string]: string | boolean; } | undefined): Promise<T> {
        throw new Error("Method not implemented.");
    }
    put<T extends import("../../../../base/src/models/rest/IRestObject").IRestObject>(url: string, obj: Partial<T>, options: { [key: string]: string | boolean; }, params?: { [key: string]: string | boolean; } | undefined): Promise<T> {
        throw new Error("Method not implemented.");
    }
    delete(url: string, options: { [key: string]: string | boolean; }): Promise<void> {
        throw new Error("Method not implemented.");
    }
}