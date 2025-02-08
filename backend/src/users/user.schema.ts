import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document & { _id: Types.ObjectId };

@Schema()
export class User {
  @Prop({ required: true, unique: true, trim: true })
  influencerName: string; 

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string; 

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ required: true, unique: true, match: /^\+?[1-9]\d{1,14}$/, trim: true })
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
