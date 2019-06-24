import winston, { format } from 'winston';
const { combine, timestamp, prettyPrint } = format;

let logger: winston.Logger;

const defaultOptions = {
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.Console()
  ]
};

export default class Logger {
  public static init(config?: winston.LoggerOptions, loggerInstance?: winston.Logger) {
    if (loggerInstance) {
      logger = loggerInstance;
    } else {
      const options = { ...defaultOptions, ...config };

      logger = winston.createLogger(options);
    }
  }

  public static getLogger() {
    return logger;
  }

  public static error(message: string, meta?: any) {
    return logger.log('error', message, meta);
  }

  public static info(message: string, meta?: any) {
    return logger.log('info', message, meta);
  }
}