import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Entity extends Document {

    @Prop({ required: true })
    designation: string;

    @Prop({ enum: ['Empresa','Associação','Organismo público'], required: true })
    type: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    admin: mongoose.Types.ObjectId;

}
export const EntitySchema = SchemaFactory.createForClass(Entity);