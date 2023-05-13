import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ActivityByUser, ActivityByUserDocument } from '../schemas/activity-by-user.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/shared/dto/token.dto';
import { Activity, ActivityDocument } from 'src/activities/schemas/activity.schema';
import { AddActivityByUser } from '../dto/AddActivityByUser';

@Injectable()
export class ActivityByUserService {
    /**
     *
     */
    constructor(
        @InjectModel(ActivityByUser.name) private readonly activityByUserModel: Model<ActivityByUserDocument>,
        @InjectModel(Activity.name) private readonly activityModel: Model<ActivityDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService) {}

    async AddActivityByUser(request: Request, activity: AddActivityByUser){
        const tokenHeader: string = request.headers["authorization"]
        const tokenDecode = this.jwtService.decode(tokenHeader.split(' ')[1], { json: true }) as Token
        const finduser = await this.userModel.findOne({
            email:tokenDecode.email,
             name:tokenDecode.name
        });
        const findActivity = await this.activityModel.findById(activity.idActivity);

        const findActivityByUser = await this.activityByUserModel.findOne({
            idUser: finduser._id,
            idActivity: findActivity._id,
        });

        if (!findActivityByUser){
            await this.activityByUserModel.create({
                idUser: finduser._id,
                idActivity: findActivity._id,
                isDone: true,
                timeDone: activity.timeDone
            });
        }else{
            if ((await findActivityByUser).timeDone > activity.timeDone){
                await this.activityByUserModel.updateOne({
                    timeDone: activity.timeDone
                });
            }
        }
        
        const findActivityByUserResponse = await this.activityByUserModel.findOne({
            idUser: finduser._id,
            idActivity: findActivity._id,
        });

        return findActivityByUserResponse;
    }
}
