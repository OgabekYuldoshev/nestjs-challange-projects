import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Document {
  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  description: string;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
