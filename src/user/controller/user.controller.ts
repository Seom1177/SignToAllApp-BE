import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from '../services/user.service';
import { Request} from 'express';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor( private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Req() request: Request){
        //return request.headers.authorization;
        return this.userService.getUserData(request.headers.authorization);
    }
}
