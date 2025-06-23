import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { Participant, ParticipantSchema } from './schemas/participant.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Competition, CompetitionSchema } from '../competitions/schemas/competition.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Participant.name, schema: ParticipantSchema},
        { name: User.name, schema: UserSchema },
        { name: Competition.name, schema: CompetitionSchema }])
    ],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
})
export class ParticipantsModule {}
