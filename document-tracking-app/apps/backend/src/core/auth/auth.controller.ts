import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { get } from 'radash';

import { Public } from '../../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('me')
  @HttpCode(200)
  async getMe(@Req() request: Request) {
    const user = await this.authService.me(get(request, 'user.email'));
    return {
      data: user,
    };
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() payload: LoginDto, @Res() res: Response) {
    const token = await this.authService.login(payload);

    res.json({
      data: token,
    });
  }
}
