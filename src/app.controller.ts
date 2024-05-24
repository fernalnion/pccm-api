import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getApplicationName();
  }

  @Get('heartbeat')
  heartbeat() {
    return {
      status: true,
      timestamp: new Date().getTime(),
    };
  }
}
