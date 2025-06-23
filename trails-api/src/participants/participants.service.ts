import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Participant } from './schemas/participant.schema';
import { Types } from 'mongoose';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParticipantsService {
  constructor(@InjectModel(Participant.name) private participantModel: Model<Participant>) {}

  async create(createParticipantDto: CreateParticipantDto, userId: string): Promise<Participant> {
  
      const createdParticipant = new this.participantModel({...createParticipantDto, user:userId});
  
      return createdParticipant.save();
    }

  async findAll(): Promise<Participant[]> {
      return this.participantModel
        .find()
        .populate('user','username')
        .populate('competitions')
        .exec();
    }

  async findOne(_id: string): Promise<Participant> {
      
      if (!Types.ObjectId.isValid(_id)) {
        throw new NotFoundException(`Invalid ID format: ${_id}`);
      }
  
      const participant = await this.participantModel
        .findById(_id)
        .populate('user','username')
        .populate('competitions')
        .exec();
  
      if (!participant) {
        throw new NotFoundException(`User with ID ${_id} not found`);
      }
  
      return participant;
    }

  async update(_id: string, updateParticipantDto: UpdateParticipantDto): Promise<Participant | null> {
      return this.participantModel.findByIdAndUpdate(new Types.ObjectId(_id), updateParticipantDto, { new: true }).exec(); 
    }

  async remove(_id: string): Promise<Participant> {
      
      if (!Types.ObjectId.isValid(_id)) {
        throw new NotFoundException(`Invalid ID format: ${_id}`);
      }
  
      const deletedParticipant = await this.participantModel.findByIdAndDelete(_id).exec();
  
      if (!deletedParticipant) {
        throw new NotFoundException(`User with ID ${_id} not found`);
      }
  
      return deletedParticipant;
  
    }

  async registerToCompetition(userId: string, competitionId: string): Promise<Participant> {
    const participant = await this.participantModel.findOne({ user: userId });

    if (!participant) {
      throw new NotFoundException('Participante não encontrado');
    }

    const competitionObjectId = new Types.ObjectId(competitionId);

    // Verifica se já está inscrito
    if (participant.competitions.some(c => c.equals(competitionObjectId))) {
      throw new BadRequestException('Já inscrito nesta competição');
    }

    // Adiciona a competição
    participant.competitions.push(competitionObjectId);
    return participant.save();
  }

  async getCompetitionsForParticipant(userId: string) {
    const participant = await this.participantModel
      .findOne({ user: userId })
      .populate('competitions')
      .exec();

    if (!participant) {
      throw new NotFoundException('Participante não encontrado');
    }

    return participant.competitions;
  }

}
