import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { LoginAuthDto } from '../dto/login-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    /**
     *  This controller is to log in and sign up
     */
    constructor(private readonly authService: AuthService) { }

  @Post('register')
  registerUser(@Body() userObject: RegisterAuthDto) {
    return this.authService.register(userObject);
    //console.log(userObject);
  }

  //Todo login
  @Post('login')
  loginUser(@Body() userObjectlogin: LoginAuthDto) {
    return this.authService.login(userObjectlogin);
  }
}
