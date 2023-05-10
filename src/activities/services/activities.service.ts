import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from '../schemas/activity.schema';
import { Model } from 'mongoose';

@Injectable()
export class ActivitiesService {
    /**
     *
     */
    constructor(@InjectModel(Activity.name) private readonly activityModel: Model<ActivityDocument>) {}
    async findAll(){
        return await this.activityModel.find({});
    }
}
