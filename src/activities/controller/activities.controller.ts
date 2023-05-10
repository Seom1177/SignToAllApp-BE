import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActivitiesService } from '../services/activities.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('activities')
@Controller('activities')
export class ActivitiesController {
    /**
     *
     */
    constructor(private readonly activitiesService:ActivitiesService) {}
    @UseGuards(JwtAuthGuard)
    @Get('getActivities')
    findAll(){
        return this.activitiesService.findAll();
    }
}
