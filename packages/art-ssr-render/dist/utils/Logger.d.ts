import winston from 'winston';
declare class Logger {
    private static loggerInstance;
    static init(config?: winston.LoggerOptions, loggerInstance?: winston.Logger): winston.Logger | undefined;
    static getLogger(): winston.Logger;
    static error(message: string, meta?: any): winston.Logger;
    static info(message: string, meta?: any): winston.Logger;
}
export default Logger;
