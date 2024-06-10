import { INestApplication } from "@nestjs/common";
import * as compression from 'compression';
// import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

export const setMiddlewares = (app: INestApplication) => {
  app.use(compression())
  app.use(cookieParser());
}