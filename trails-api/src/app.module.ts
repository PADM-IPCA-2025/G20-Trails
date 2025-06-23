import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EntitiesModule } from './entities/entities.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { ParticipantsModule } from './participants/participants.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI is not defined');
}

@Module({
  imports: [UsersModule, MongooseModule.forRoot(mongoUri), EntitiesModule, 
    CompetitionsModule, ParticipantsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
