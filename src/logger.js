import winston from 'winston';

export class Logger {
    constructor() {
        this.logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)()
            ]
        });
    }
    set info(msg){
        this.logger.info(msg);
    }
}