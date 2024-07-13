import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get('helthcheck')
  helthcheck() {
    return {
      status: 'ok',
    }
  }
}
