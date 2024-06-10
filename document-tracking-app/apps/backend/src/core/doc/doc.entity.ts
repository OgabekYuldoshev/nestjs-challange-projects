import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

export type DocModel = Model<Doc>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Doc {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Files', required: true })
  fileId: string;
}

export const DocSchema = SchemaFactory.createForClass(Doc);
