import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard)
  @Get("me")
  getMe(@Req() request: Request) {
    return request["user"]
  }

  @Post("login")
  @HttpCode(200)
  async login(@Body() payload: LoginDto, @Res() res: Response) {
    const token = await this.authService.login(payload)

    res.json({
      data: token
    })
  }
}
