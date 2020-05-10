export interface ILoggingService {
    debug(messages: any | any[]): void;
    info(messages: any | any[]): void;
    warn(messages: any | any[]): void;
    error(messages: any | any[]): void;
}