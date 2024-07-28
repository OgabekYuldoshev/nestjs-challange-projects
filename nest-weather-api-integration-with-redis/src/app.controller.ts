import { Controller, Get, Inject, Ip, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('current')
  async getCurrentWeather(@Query('q') q: string) {
    const cache = await this.cacheManager.get(q);
    const data = cache || (await this.appService.current(q));
    if (!cache) this.cacheManager.set(q, data, 5000);

    return {
      data,
    };
  }

  @Get('ip')
  async getIp(@Ip() ip: string) {
    const cache = await this.cacheManager.get(ip);
    const data = cache || (await this.appService.current(ip));

    if (!cache) this.cacheManager.set(ip, data, 5000);

    return {
      data,
    };
  }
}
