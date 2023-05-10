import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from '../services/user.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor( private readonly userService: UserService) {}
    // @UseGuards(JwtAuthGuard)
    // @Get()
    // findAll(){
    //     return this.userService.findAll();
    // }
}
