// seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './src/users/schemas/user.schema';
import { Participant } from './src/participants/schemas/participant.schema';
import { Entity } from './src/entities/schemas/entity.schema';
import { Competition } from './src/competitions/schemas/competition.schema';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userModel = app.get<Model<User>>(getModelToken(User.name));
  const participantModel = app.get<Model<Participant>>(getModelToken(Participant.name));
  const entityModel = app.get<Model<Entity>>(getModelToken(Entity.name));
  const competitionModel = app.get<Model<Competition>>(getModelToken(Competition.name));

  // 1. Criar um utilizador admin
  let admin = await userModel.findOne({ username: 'admin' });
  if (!admin) {
    admin = await userModel.create({
      username: 'admin',
      password: '1234',
      role: 'admin',
    });
    console.log('Admin criado');
  }

  // 2. Criar um utilizador participante
  let participantUser = await userModel.findOne({ username: 'participant1' });
  if (!participantUser) {
    participantUser = await userModel.create({
      username: 'participant1',
      password: '1234',
      role: 'participant',
    });
    console.log('User participante criado');
  }

  // 3. Criar participante associado
  let participant = await participantModel.findOne({ user: participantUser._id });
  if (!participant) {
    participant = await participantModel.create({
      firstName: 'João',
      surname: 'Silva',
      mobilePhoneNumber: '912345678',
      email: 'joao@example.com',
      birthDate: new Date('1990-01-01'),
      address: 'Rua A',
      height: 175,
      weight: 70,
      municipality: 'Lisboa',
      region: 'Lisboa',
      country: 'Portugal',
      gender: 'male',
      user: participantUser._id,
      competitions: [],
    });
    console.log('Participante criado');
  }

  // 4. Criar entidade associada ao admin
  let entity = await entityModel.findOne({ designation: 'Clube Trilhos' });
  if (!entity) {
    entity = await entityModel.create({
      designation: 'Clube Trilhos',
      type: 'Associação',
      admin: admin._id,
    });
    console.log('Entidade criada');
  }

  // 5. Criar competição
  const existingCompetition = await competitionModel.findOne({ designation: 'Trilho da Serra' });
  if (!existingCompetition) {
    await competitionModel.create({
      designation: 'Trilho da Serra',
      type: 'Trail',
      date: new Date(),
      entity: entity._id,
    });
    console.log('Competição criada');
  }

  await app.close();
  console.log('Seed completo!');
}

bootstrap();