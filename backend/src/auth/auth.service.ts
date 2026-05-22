import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && await bcrypt.compare(pass, user.password_hash)) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        organization: user.organization_name
      }
    };
  }

  async register(email: string, pass: string, role: Role, organization_name: string) {
    const existing = await this.usersService.findOne(email);
    if (existing) {
      throw new ConflictException('Email already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(pass, salt);

    const newUser = await this.usersService.create({
      email,
      password_hash,
      role,
      organization_name
    });

    const { password_hash: pw, ...result } = newUser;
    return result;
  }
}
