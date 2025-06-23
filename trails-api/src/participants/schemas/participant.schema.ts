import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Participant extends Document {

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    surname: string;

    @Prop({ required: true })
    mobilePhoneNumber: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    birthDate: Date;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    height: number;

    @Prop({ required: true })
    weight: number;

    @Prop({ required: true })
    municipality: string;

    @Prop({ required: false })
    region?: string;

    @Prop({ required: true })
    country: string;

    @Prop({ enum: ['male', 'female', 'other'], required: true })
    gender: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Competition' }] })
    competitions: mongoose.Types.ObjectId[];
}
export const ParticipantSchema = SchemaFactory.createForClass(Participant);