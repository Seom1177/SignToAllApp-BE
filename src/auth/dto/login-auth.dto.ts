import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4, {
    message: 'Esta contraseña es muy corto.',
  })
  @MaxLength(64, {
    message: 'Esta contraseña es muy larga.',
  })
  password: string;
}
