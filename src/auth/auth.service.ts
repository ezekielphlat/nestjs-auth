import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constants';
import { Request, Response } from 'express';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async signup(dto: AuthDto) {
    const { email, password } = dto;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    console.log(foundUser);
    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await this.generatePasswordHash(password);
    await this.prisma.user.create({ data: { email, hashedPassword } });
    return { message: 'sign up successful' };
  }
  async signin(dto: AuthDto, req: Request, res: Response) {
    const { email, password } = dto;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    console.log(foundUser);
    if (!foundUser) {
      throw new BadRequestException('Wrong Credential');
    }
    const isMatch = await this.comparePassword(
      password,
      foundUser.hashedPassword,
    );
    if (!isMatch) {
      throw new BadRequestException('Wrong credentials');
    }
    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });
    if (!token) {
      throw new ForbiddenException();
    }
    res.cookie('token', token);
    return res.send({ message: 'Login successful' });
  }
  signout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'logout successfuly' });
  }

  async generatePasswordHash(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
  async signToken(args: { id: string; email: string }) {
    const payload = args;
    return await this.jwt.signAsync(payload, { secret: jwtSecret });
  }
}
