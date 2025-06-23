import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionsController } from './competitions.controller';
import { Competition, CompetitionSchema } from './schemas/competition.schema';
import { Participant, ParticipantSchema } from '../participants/schemas/participant.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Entity, EntitySchema } from '../entities/schemas/entity.schema';


@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Competition.name, schema: CompetitionSchema},
        { name: Entity.name, schema: EntitySchema },
        { name: Participant.name, schema: ParticipantSchema }])
    ],
  controllers: [CompetitionsController],
  providers: [CompetitionsService],
})
export class CompetitionsModule {}
