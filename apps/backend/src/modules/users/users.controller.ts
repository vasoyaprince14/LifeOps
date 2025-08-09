import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { IsEmail, IsOptional, IsString } from 'class-validator';

class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  name?: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  findAll() {
    return this.users.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.users.getById(id);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.users.create(body.email, body.name);
  }
}


