import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/common/decorators/public.decorator';

import { FileService } from '../file/file.service';
import { DocService } from './doc.service';
import { CreateDocDto } from './dto/create.dto';

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;


@Controller('doc')
export class DocController {
  constructor(
    private readonly docService: DocService,
    private readonly fileService: FileService,
  ) {}
  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() payload: CreateDocDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    const uploadedFile = await this.fileService.uploadFile(file);
    const newDoc = await this.docService.createNewDocument(payload, uploadedFile._id.toString());
    return newDoc;
  }
}
