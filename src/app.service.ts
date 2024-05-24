import { Injectable } from '@nestjs/common';
import { APP_NAME } from './app.const';

@Injectable()
export class AppService {
  getApplicationName(): string {
    return APP_NAME;
  }
}
