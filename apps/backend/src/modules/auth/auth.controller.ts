import { Body, Controller, Post } from '@nestjs/common';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { AuthService } from './auth.service';

class AuthDto {
  @IsEmail()
  email!: string;
  @IsOptional()
  @IsString()
  password?: string;
  @IsOptional()
  @IsString()
  name?: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  register(@Body() body: AuthDto) {
    return this.auth.register(body.email, body.password, body.name);
  }

  @Post('login')
  login(@Body() body: AuthDto) {
    return this.auth.login(body.email, body.password);
  }
}


