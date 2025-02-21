import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PublicRoute } from 'src/app/common/decorators/public';
import { User } from '../common/decorators/medecorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @PublicRoute()
  login(@Body() createAuthDto: { email: string; password: string }) {
    return this.authService.login(createAuthDto);
  }

  @Post('register')
  @PublicRoute()
  register(@Body() createAuthDto: { email: string; password: string }) {
    return this.authService.register(createAuthDto);
  }

  @Get('me')
  me(@User() req) {
    console.log('req', req);
    return req;
  }
}
