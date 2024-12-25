import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PublicRoute } from 'src/common/Decorators/Public';

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
}
