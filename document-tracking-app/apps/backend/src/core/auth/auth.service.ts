import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(payload: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(payload.email);
    if (!user || user.password.toString() !== payload.password) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const parseUser = user.toJSON();

    delete parseUser.password;

    const token = await this.jwtService.signAsync(parseUser);

    return {
      access_token: token,
    };
  }

  async me(email: string) {
    const user = await this.userService.findByEmail(email);

    const userJson = user.toJSON();

    delete userJson.password;

    return userJson;
  }
}
