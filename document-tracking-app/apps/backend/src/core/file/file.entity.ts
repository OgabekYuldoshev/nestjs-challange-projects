import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model } from "mongoose";

export type FileModel = Model<File>

@Schema({
    timestamps: true,
    versionKey: false
})
export class File{
    @Prop()
    orginalName: string;

    @Prop()
    fileName: string;

    @Prop()
    ext: string;

    @Prop()
    size: number;

    @Prop()
    path: string
}

export const FileSchema = SchemaFactory.createForClass(File);