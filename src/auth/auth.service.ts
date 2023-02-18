import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async signup() {
    return 'sign up was successful';
  }
  signin() {
    return 'sign in was successful';
  }
  signout() {
    return 'sign out was successful';
  }
}
