import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
  @Post('signin')
  signIn(@Body() authDto: AuthDto, @Req() req: Request, @Res() res: Response) {
    return this.authService.signin(authDto, req, res);
  }

  @Get('signout')
  signOut(@Req() req: Request, @Res() res: Response) {
    return this.authService.signout(req, res);
  }
}
