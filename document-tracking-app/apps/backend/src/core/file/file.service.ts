import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { join } from 'path';

import { File, FileModel } from './file.entity';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: FileModel) {}

  async uploadFile(file: Express.Multer.File) {
    const [_, ext] = file.originalname.split('.');
    const path = join('static', `${file.filename}.${ext}`);
    const newFile = await this.fileModel.create({
      orginalName: file.originalname,
      fileName: file.filename,
      ext,
      size: file.size,
      path,
    });
    return newFile;
  }
}
