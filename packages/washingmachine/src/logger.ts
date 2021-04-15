import pino from "pino";
import pinoHttp from "pino-http";

const log = pino({ level: process.env.LOG_LEVEL || 'info' });
const logHttp = pinoHttp({ logger: log });

export { log, logHttp };
