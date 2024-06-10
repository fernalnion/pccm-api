import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IConfig } from './interfaces/IConfig';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_NAME } from './app.const';
import { json } from 'express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<IConfig>>(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('PCCM')
    .setDescription(APP_NAME)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(json({ limit: '10mb' }));
  app.enableCors();
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
