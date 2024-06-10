import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {
  }

  async login(payload: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(payload.email)
    if (!user || user.password != payload.password) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }

    const token = await this.jwtService.signAsync(user.toJSON());

    return {
      access_token: token
    }
  }

  me() {
    return {
      id: "start"
    }
  }

}
