import winston  from 'winston';
import path from 'path';


const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
});

//files
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
);

//logs
const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
);

const transport  = [
    new winston.transports.File({ filename: path.join('logs', 'error.log'), level: 'error', format: format }),
    new winston.transports.File({ filename: path.join('logs', 'combined.log'), format: format }),
    new winston.transports.Console({ format: consoleFormat })
]



const logger = winston.createLogger({
    level: 'info',
    levels,
    format,
    transports: transport
});

export default logger
