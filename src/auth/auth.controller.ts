import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signIn() {
    return this.authService.signin();
  }
  @Post('signup')
  signUp() {
    return this.authService.signup();
  }
  @Post('signout')
  signOut() {
    return this.authService.signout();
  }
}
