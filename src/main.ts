import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // config of api
  app.setGlobalPrefix('api');
  app.enableCors(CORS);

  //open api
  const config = new DocumentBuilder()
    .setTitle('SignToAll API')
    .setDescription('Documentation of SignToAll API')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  // env values
  app.use(morgan('dev'));
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'), configService.get('HOST_NAME'));
  console.log(`Open swagger: ${await app.getUrl()}/doc and process.env: ${process.env.NODE_ENV}`);
}
bootstrap();
