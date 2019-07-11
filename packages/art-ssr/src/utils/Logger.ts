import winston, { format } from 'winston';
const { combine, timestamp, prettyPrint } = format;

const defaultOptions = {
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.Console()
  ]
};

class Logger {

  private static loggerInstance: winston.Logger;

  public static init (config?: winston.LoggerOptions, loggerInstance?: winston.Logger) {
    if (!!Logger.loggerInstance) { return Logger.loggerInstance; }

    if (loggerInstance) {
      Logger.loggerInstance = loggerInstance;
    } else {
      const options = { ...defaultOptions, ...config };

      Logger.loggerInstance = winston.createLogger(options);
    }
  }

  public static getLogger() {
    return Logger.loggerInstance;
  }

  public static error(message: string, meta?: any) {
    return Logger.loggerInstance.log('error', message, meta);
  }

  public static info(message: string, meta?: any) {
    return Logger.loggerInstance.log('info', message, meta);
  }
}

Logger.init();

export default Logger;