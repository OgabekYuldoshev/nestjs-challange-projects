import { Module } from '@nestjs/common';

import { CONFIG_ENV, configEnv } from './configEnv';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: configEnv.MONGODB_URI,
      }),
    }),
    DocumentModule,
  ],
  providers: [
    {
      provide: CONFIG_ENV,
      useValue: configEnv,
    },
  ],
})
export class AppModule {}
