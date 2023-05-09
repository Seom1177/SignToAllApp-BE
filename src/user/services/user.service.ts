import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    /**
     *
     */
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}
    async findAll(){
        return await this.userModel.find({});
    }
}
