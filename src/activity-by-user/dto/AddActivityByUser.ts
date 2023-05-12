import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class AddActivityByUser {
    @ApiProperty({
        description: 'Id del usuario que realizo la actividad',
      })
    @IsNotEmpty({
        message: 'No hay un usuario'
    })
    idUser: string;

    @ApiProperty()
    @IsNotEmpty({
        message: 'No hay una actividad'
    })
    idActivity: string;

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsNumber()
    // score: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isDone: boolean;

    @ApiProperty()
    @IsNotEmpty()
    timeDone: number;
}