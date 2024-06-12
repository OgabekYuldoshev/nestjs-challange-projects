import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ResponseObject } from 'src/common/response';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Document } from './document.entity';

@ApiTags('Documentation')
@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}
  @Post()
  @ApiOperation({ summary: 'Create new documentation api' })
  @ApiBody({
    type: CreateDocumentDto,
    description: 'Document body',
  })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: ResponseObject<Document>,
  })
  async createDocument(@Body() payload: CreateDocumentDto) {
    const data = await this.documentService.create(payload);
    return new ResponseObject(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update documentation api' })
  @ApiBody({
    type: CreateDocumentDto,
    description: 'Document body',
  })
  @ApiResponse({
    status: 200,
    description: 'Updated',
    type: ResponseObject<Document>,
  })
  async updateDocument(
    @Param('id') id: string,
    @Body() payload: UpdateDocumentDto,
  ) {
    const data = await this.documentService.update(id, payload);
    return new ResponseObject(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete documentation api' })
  @ApiResponse({
    status: 200,
    description: 'Deleted',
    type: ResponseObject<Document>,
  })
  async deleteDocument(@Param('id') id: string) {
    const data = await this.documentService.remove(id);
    return new ResponseObject(data);
  }

  @Get()
  @ApiOperation({ summary: 'List documentation api' })
  @ApiResponse({
    status: 200,
    type: ResponseObject<Document[]>,
  })
  async getList() {
    return new ResponseObject(await this.documentService.findAll());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Single documentation api' })
  @ApiResponse({
    status: 200,
    type: ResponseObject<Document>,
  })
  async getSingle(@Param('id') id: string) {
    const data = await this.documentService.findOne(id);
    return new ResponseObject(data);
  }
}
