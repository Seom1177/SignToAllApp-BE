import { Module } from '@nestjs/common';
import { ActivityByUserController } from './controller/activity-by-user.controller';
import { ActivityByUserService } from './services/activity-by-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityByUser, ActivityByUserSchema } from './schemas/activity-by-user.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Activity, ActivitySchema } from 'src/activities/schemas/activity.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: ActivityByUser.name,
        schema: ActivityByUserSchema
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Activity.name,
        schema: ActivitySchema
      }
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: 3600,
                },
            }),
            inject: [ConfigService],
    }),
  ],
  controllers: [ActivityByUserController],
  providers: [ActivityByUserService]
})
export class ActivityByUserModule {}
