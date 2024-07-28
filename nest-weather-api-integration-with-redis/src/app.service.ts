import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { config } from './config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  async current(q: string) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.get(config.get('API_URL') + '/v1/current.json', {
          params: { q, key: config.get('API_KEY') },
        }),
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async ip(ip: string) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.get(config.get('API_URL') + '/v1/ip.json', {
          params: { q: ip, key: config.get('API_KEY') },
        }),
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
