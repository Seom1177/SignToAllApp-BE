import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ActivityByUser, ActivityByUserDocument } from '../schemas/activity-by-user.schema';
import { Model } from 'mongoose';

@Injectable()
export class ActivityByUserService {
    /**
     *
     */
    constructor(@InjectModel(ActivityByUser.name) private readonly activityByUserModel: Model<ActivityByUserDocument>) {}
    async AddActivityByUser(idUser:string, idActivity:string){

    }
}
