import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

import { FileModule } from '../file/file.module';
import { DocController } from './doc.controller';
import { Doc, DocSchema } from './doc.entity';
import { DocService } from './doc.service';

@Module({
  imports: [
    MulterModule.register({
      dest: 'static',
    }),
    MongooseModule.forFeature([{ name: Doc.name, schema: DocSchema }]),
    FileModule,
  ],
  providers: [DocService],
  controllers: [DocController],
  exports: [DocService],
})
export class DocModule {}
