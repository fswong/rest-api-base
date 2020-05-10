import { IRestObject } from "../rest/IRestObject";
import { IRestCollection } from "../rest/IRestCollection";

export interface IHttpClient {
    get<T extends IRestObject>(url: string, options: {[key: string]: string | boolean}, params?: {[key: string]: string | boolean}): Promise<T>;

    list<T extends IRestObject>(url: string, options: {[key: string]: string | boolean}, params?: {[key: string]: string | boolean}): Promise<IRestCollection<T>>;

    post<T extends IRestObject>(url: string, obj: Partial<T>, options: {[key: string]: string | boolean}, params?: {[key: string]: string | boolean}): Promise<T>;

    put<T extends IRestObject>(url: string, obj: Partial<T>, options: {[key: string]: string | boolean}, params?: {[key: string]: string | boolean}): Promise<T>;

    delete(url: string, options: {[key: string]: string | boolean}): Promise<void>;
}
