import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/shared/dto/token.dto';
import { userResponse } from '../dto/userResponse.dto';

@Injectable()
export class UserService {
    /**
     *
     */
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService) {}
        
    async getUserData(request: string): Promise<userResponse>{
        const tokenDecode = this.jwtService.decode(request.split(' ')[1], { json: true }) as Token
        const finduser = await this.userModel.findOne({
            email:tokenDecode.email,
             name:tokenDecode.name
        });
        const response: userResponse = {
            birthDay: finduser.birthDay,
            email: finduser.email,
            gender: finduser.gender,
            lastName: finduser.lastName,
            name: finduser.name,
            nuip: finduser.nuip
        }
        return response;
    }
}
