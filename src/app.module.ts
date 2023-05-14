import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ActivitiesModule } from './activities/activities.module';
import { ActivityByUserModule } from './activity-by-user/activity-by-user.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`./src/environments/.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL + process.env.DB_NAME),
    AuthModule,
    UserModule,
    ActivitiesModule,
    ActivityByUserModule,
    SharedModule,
  ],
})
export class AppModule {}
