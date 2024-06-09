import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './features/auth/auth.module';
import { RoleModule } from './features/role/role.module';
import { UserModule } from './features/user/user.module';
import { DatabaseModule } from './shared/database/database.module';
import { BusinessModule } from './business/business.module';
import { StartupService } from './services/startup.service';
import { CarbonFootprintModule } from './features/carbon-footprint/carbon-footprint.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    BusinessModule,
    AuthModule,
    RoleModule,
    UserModule,
    CarbonFootprintModule,
  ],
  controllers: [AppController],
  providers: [
    StartupService,
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
