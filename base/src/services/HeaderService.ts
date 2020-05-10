import * as lodash from "lodash";

export class HeaderService {
    buildOptions(configurations: {[key: string]: string}, withCredentials = true): {[key: string]: string | boolean} {
        return {
            withCredentials
        };
    }

    buildParams(params?: {[key: string]: string | string[] | boolean}): {[key: string]: string | boolean} | undefined {
        if(!params) {
            return undefined;
        }
        const keys = Object.keys(params);
        const formatted = keys.map(key => [key, this.formatArrays(params[key])]);
        return lodash.fromPairs(formatted);
    }

    private formatArrays(param: string | string[] | boolean): string | boolean {
        if (Array.isArray(param)) {
            return param.join(',')
        }
        return param as string | boolean;
    }
}