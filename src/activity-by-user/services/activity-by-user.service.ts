import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ActivityByUser, ActivityByUserDocument } from '../schemas/activity-by-user.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/shared/dto/token.dto';
import { Activity, ActivityDocument } from 'src/activities/schemas/activity.schema';
import { AddActivityByUser } from '../dto/AddActivityByUser';
import { ActivityByUserDto } from '../dto/ActivityByUserDto.dto';

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

    async AddActivityByUser(request: string, activity: AddActivityByUser): Promise<ActivityByUserDto>{
        const tokenDecode = this.jwtService.decode(request.split(' ')[1], { json: true }) as Token
        const finduser = await this.userModel.findOne({
            email:tokenDecode.email,
             name:tokenDecode.name
        });
        const findActivity = await this.activityModel.findById(activity.idActivity);

        if (!finduser || !findActivity) throw new HttpException('Error al guardar progreso', 404);

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

        let response: ActivityByUserDto = {
            idActivity: findActivityByUserResponse.idActivity,
            isDone: findActivityByUserResponse.isDone,
            timeDone: findActivityByUserResponse.timeDone
        }

        return response;
    }

    async FindActivityByUser(request: string): Promise<ActivityByUserDto[]>{
        const tokenDecode = this.jwtService.decode(request.split(' ')[1], { json: true }) as Token
        const finduser = await this.userModel.findOne({
            email:tokenDecode.email,
             name:tokenDecode.name
        });
        
        const findActivities = await this.activityModel.find({});
        const findActivityByUser = await this.activityByUserModel.find({
            idUser: finduser._id
        });

        let listActivityByUserDto: ActivityByUserDto[] = [];
        findActivities.forEach(activity => {
            let newActivity: ActivityByUserDto = {
                idActivity: activity._id,
                isDone: findActivityByUser.find(actUser=>actUser.idActivity === activity._id.toString())?.isDone ?? false,
                timeDone: findActivityByUser.find(actUser=>actUser.idActivity === activity._id.toString())?.timeDone ?? 0
            }
            listActivityByUserDto.push(newActivity)
        });
        return listActivityByUserDto;
    }
}
