import { Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async getMyUser(id: string, req: Request) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      return new NotFoundException();
    }
    const decodeduser = req.user as { id: string; email: string };
    console.log(decodeduser);
    if (user.id !== decodeduser.id) {
      return new ForbiddenException();
    }
    delete user.hashedPassword;
    return { user };
  }
  async getUsers() {
    return await this.prisma.user.findMany({
      select: { id: true, email: true },
    });
  }
}
