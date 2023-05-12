import { Module } from '@nestjs/common';
import { ActivityByUserController } from './controller/activity-by-user.controller';
import { ActivityByUserService } from './services/activity-by-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityByUser, ActivityByUserSchema } from './schemas/activity-by-user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: ActivityByUser.name,
        schema: ActivityByUserSchema
      }
    ])
  ],
  controllers: [ActivityByUserController],
  providers: [ActivityByUserService]
})
export class ActivityByUserModule {}
