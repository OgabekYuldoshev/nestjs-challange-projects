import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from './document.entity';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Document.name) private documentModel: Model<Document>,
  ) {}

  async findAll(): Promise<Document[]> {
    return await this.documentModel.find();
  }
  async findOne(id: string): Promise<Document> {
    const user = await this.documentModel.findById(id);

    if (!user) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
  async create(document: CreateDocumentDto): Promise<Document> {
    const newDocument = await this.documentModel.create(document);
    return newDocument;
  }
  async update(id: string, document: UpdateDocumentDto): Promise<Document> {
    const newDocument = await this.documentModel.findByIdAndUpdate(
      id,
      document,
      {
        new: true,
      },
    );

    if (!newDocument) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    return newDocument;
  }

  async remove(id: string): Promise<Document> {
    const deletedDocument = await this.documentModel.findByIdAndDelete(id);
    if (!deletedDocument) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    return deletedDocument;
  }
}
