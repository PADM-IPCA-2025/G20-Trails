import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ enum: ['admin','participant'], required: true })
    role: string;

}
export const UserSchema = SchemaFactory.createForClass(User);
