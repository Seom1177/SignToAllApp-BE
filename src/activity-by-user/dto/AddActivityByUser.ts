import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class AddActivityByUser {
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
    @IsNumber()
    timeDone: number;
}