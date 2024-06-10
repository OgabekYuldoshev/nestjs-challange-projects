import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail } from "class-validator";
import { Model } from "mongoose";

export type UserModel = Model<User>

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop({ unique: true })
  @IsEmail()
  email: string;

  @Prop()
  country: string

  @Prop()
  address: string;

  @Prop()
  password: number;
}

export const UserSchema = SchemaFactory.createForClass(User)