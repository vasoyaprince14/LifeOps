import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService, private readonly prisma: PrismaService) {}

  async register(email: string, password?: string, name?: string) {
    const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
    const user = await this.prisma.user.create({ data: { email, name, passwordHash } });
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
    return { user, token };
  }

  async login(email: string, password?: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (user.passwordHash && password) {
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
    return { user, token };
  }
}


