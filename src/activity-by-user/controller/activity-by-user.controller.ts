import { Controller, Req, Post, UseGuards, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActivityByUserService } from '../services/activity-by-user.service';
import { AddActivityByUser } from '../dto/AddActivityByUser';

@ApiTags('activity-by-user')
@Controller('activity-by-user')
export class ActivityByUserController {
    /**
     *
     */
    constructor(private readonly activityByUserService:ActivityByUserService) {}

    @UseGuards(JwtAuthGuard)
    @Post('add')
    AddActivityByUser(@Req() request: Request, @Body() idActivity:AddActivityByUser ){
        return this.activityByUserService.AddActivityByUser(request, idActivity);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get')
    getActivitiesByUser(@Req() request: Request){
        return this.activityByUserService.FindActivityByUser(request);
    }
}
