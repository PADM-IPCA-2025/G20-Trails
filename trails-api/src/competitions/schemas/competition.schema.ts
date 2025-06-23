import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Competition extends Document {

    @Prop({ required: true })
    designation: string;

    @Prop({ enum: ['BTT', 'Trail'], required: true })
    type: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Entity', required: true })
    entity: mongoose.Types.ObjectId;

}
export const CompetitionSchema = SchemaFactory.createForClass(Competition);