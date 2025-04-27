import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as winston from 'winston';

@Controller()
export class AppController {
  private readonly logger;
  constructor(private readonly appService: AppService,) {
    this.logger = winston.createLogger(
      {
        transports: [
          new winston.transports.Console()
        ]
      }
    );
  }

  @Get()
  getHello(): string {
    this.logger.debug('1234');
    this.logger.info('1234');
    this.logger.warn('1234');
    // console.log('1234')
    // console.log('1234')
    // console.log('1234')
    return this.appService.getHello();
  }
}
