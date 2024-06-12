import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  description: string;
}
