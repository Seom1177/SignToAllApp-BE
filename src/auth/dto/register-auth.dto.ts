import { ApiProperty, PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import { IsDate, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @ApiProperty({
    description: 'Nombre de la persona',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Apellido de la persona',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Documento de Identidad de la persona',
  })
  @IsNotEmpty()
  @IsNumber()
  @MinLength(5, {
    message: 'Este documento de identidad es muy corto.',
  })
  @MaxLength(20, {
    message: 'Este documento de identidad es muy largo.',
  })
  nuip: number;

  @ApiProperty()
  @IsDate()
  birthDay: Date;

  @ApiProperty({
    description: 'Genero de la persona',
    enum: ['Masculino', 'Femenino'],
  })
  @IsNotEmpty()
  @IsString()
  gender: string;

}
