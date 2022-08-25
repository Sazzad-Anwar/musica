import { LoginDto, RegistrationDto } from './../dto/auth/auth.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  signup(@Body() dto: RegistrationDto) {
    return this.authService.registration(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
