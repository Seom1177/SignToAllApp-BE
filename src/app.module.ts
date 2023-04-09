import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./src/environments/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    })
  ],
})
export class AppModule {}
