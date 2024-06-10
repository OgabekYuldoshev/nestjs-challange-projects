import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Doc, DocModel } from './doc.entity';
import { CreateDocDto } from './dto/create.dto';

@Injectable()
export class DocService {
  constructor(@InjectModel(Doc.name) private docModel: DocModel) {}
  async createNewDocument(payload: CreateDocDto, fileId: string) {
    const newDoc = await this.docModel.create({
      title: payload.title,
      fileId,
    });
    return newDoc;
  }
}
