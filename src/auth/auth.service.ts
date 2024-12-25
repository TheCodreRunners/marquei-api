import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/config/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(body: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const hash = user.password;
    const isMatch = await bcrypt.compareSync(body.password, hash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    return {
      token: this.jwtService.sign({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  async register(body: { email: string; password: string }) {
    await this.prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        clientId: 1,
      },
    });
  }
}
