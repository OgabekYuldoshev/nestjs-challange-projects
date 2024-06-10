import { NestFactory } from '@nestjs/core';

import { setMiddlewares } from './app.middlewares';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');

  setMiddlewares(app)

  await app.listen(3000);
}

bootstrap();
