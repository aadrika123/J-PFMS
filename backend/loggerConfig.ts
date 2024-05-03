import winston from "winston";
const { combine, timestamp, prettyPrint, json } = winston.format;

export const warnlogger = winston.createLogger({
  format: combine(
    timestamp(),
    prettyPrint(),
    json()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "logs/audit.log",
      level: "warn",
    }),
  ],
});

export const errLogger = winston.createLogger({
  format: combine(
    timestamp(),
    prettyPrint(),
    json()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

export const infoLogger = winston.createLogger({
  format: combine(
    timestamp(),
    prettyPrint(),
    json()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "logs/info.log",
      level: "info",
    }),
  ],
});

