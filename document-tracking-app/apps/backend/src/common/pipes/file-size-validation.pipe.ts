
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(file: File) {
    const oneKb = 1000;
    return file.size < oneKb;
  }
}