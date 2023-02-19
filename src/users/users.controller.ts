import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Request } from 'express';
import { NotFoundError } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyUser(@Param() params: { id: string }, @Req() req: Request) {
    return this.usersService.getMyUser(params.id, req);
  }
  @Get('')
  getUser() {
    return this.usersService.getUsers();
  }
}
