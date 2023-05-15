import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { TokenResponseDto } from 'src/shared/dto/tokenResponse.dto';
import { Token } from 'src/shared/dto/token.dto';
import { UserDto } from '../dto/user.dto';
import { userResponse } from 'src/user/dto/userResponse.dto';
@Injectable()
export class AuthService {
	constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtAuthService: JwtService,
  ) {}

	async register(userObject: RegisterAuthDto): Promise<userResponse> {
    const findUser = await this.userModel.findOne({ $or: [{email: userObject.email}, {nuip: userObject.nuip}]});

    if (findUser) throw new HttpException('Este usuario ya existe', 404);

    const { password } = userObject; // Texto Plano
    const plainToHash = await bcrypt.hash(password, + process.env.HASH_SALT); //return encrypt password
    userObject = { ...userObject, password: plainToHash };

    await this.userModel.create(userObject);
    const findUserDb = await this.userModel.findOne({ $or: [{email: userObject.email}, {nuip: userObject.nuip}]});

    const response: userResponse = {
      name: findUserDb.name,
      lastName: findUserDb.lastName,
      email: findUserDb.email,
      birthDay: findUserDb.birthDay,
      nuip: findUserDb.nuip,
      gender: findUserDb.gender
    }
    return response;
  }

	async login(userObjectlogin: LoginAuthDto): Promise<TokenResponseDto> {
		//const { email, password } = userObjectlogin;
    const findUser = await this.userModel.findOne({ email: userObjectlogin.email });

    if (!findUser) throw new HttpException('Usuario no existe o contraseña incorrecta', 404);

    const checkedPassword = await bcrypt.compare(userObjectlogin.password, findUser.password);

    if (!checkedPassword || !findUser) throw new HttpException('Usuario no existe o contraseña incorrecta', 404);

    const payLoad:Token = { 
      email: findUser.email,
      name: findUser.name,
      lastName: findUser.lastName,
      nuip: findUser.nuip
    }; // public data
    const token = await this.jwtAuthService.sign(payLoad);
		
    const data: TokenResponseDto = {
      email: findUser.email,
      name: findUser.name,
      lastName: findUser.lastName,
      nuip: findUser.nuip,
      token,
    };

    return data;
  }
}
