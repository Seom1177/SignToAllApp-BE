import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // config of api
  app.setGlobalPrefix('api');
  app.enableCors(CORS);

  // env values
  app.use(morgan('dev'));
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'), configService.get('HOST_NAME'));
  console.log(`Application running on ${await app.getUrl()} and process.env: ${process.env.NODE_ENV}`);
}
bootstrap();
