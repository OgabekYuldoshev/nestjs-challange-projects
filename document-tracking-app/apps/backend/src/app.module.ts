import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

import { AuthGuard } from './common/guards/auth.guard';
import { configuration } from './configuration';
import { AuthModule } from './core/auth/auth.module';
import { DocModule } from './core/doc/doc.module';
import { FileModule } from './core/file/file.module';
import { UsersModule } from './core/users/users.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),

    // Databse configuration
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get("dbUrl")
      })
    }),

    AuthModule,
    UsersModule,
    DocModule,
    FileModule,
  ],
  providers:[
    {
      provide: "APP_GUARD",
      useClass: AuthGuard,
    }
  ]
})
export class AppModule { }
