import { Injectable } from '@nestjs/common';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Competition} from './schemas/competition.schema';
import { Participant } from '../participants/schemas/participant.schema';
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CompetitionsService {
  constructor(
    @InjectModel(Competition.name) private competitionModel: Model<Competition>,
    @InjectModel(Participant.name) private participantModel: Model<Participant>) {}

  async create(createCompetitionDto: CreateCompetitionDto):  Promise<Competition> {
    
    const createdCompetition = new this.competitionModel(createCompetitionDto);

    return createdCompetition.save();

  }

  async findAll(): Promise<Competition[]> {
    return this.competitionModel.find().populate('entity', 'designation').exec();
  }

  async findOne(_id: string): Promise<Competition> {
    
    if (!Types.ObjectId.isValid(_id)) {
      throw new NotFoundException(`Invalid ID format: ${_id}`);
    }

    const competition = await this.competitionModel.findById(_id).populate('entity', 'designation').exec();

    if (!competition) {
      throw new NotFoundException(`User with ID ${_id} not found`);
    }

    return competition;

  }

  async findByEntity(entityId: string): Promise<Competition[]> {
    return this.competitionModel
      .find({ entity: entityId })
      .sort({ date: -1 })
      .exec();
  } 

  async searchCompetitions(query: string): Promise<Competition[]> {
    if (!query) return [];

    const regex = new RegExp(query, 'i'); // insensitive
    return this.competitionModel
      .find({
        $or: [
          { designation: regex },
          { type: regex },
          { date: { $regex: regex } },
        ],
      })
      .populate('entity', 'designation')
      .exec();
  }

  async getParticipants(competitionId: string) {
    return this.participantModel
      .find({ competitions: competitionId })
      .select('firstName surname email')
      .exec();
  }

  async update(_id: string, updateCompetitionDto: UpdateCompetitionDto): Promise<Competition | null> {
    return this.competitionModel.findByIdAndUpdate(new Types.ObjectId(_id), updateCompetitionDto, { new: true }).exec(); 
  }

  async remove(_id: string): Promise<Competition>  {
    
    if (!Types.ObjectId.isValid(_id)) {
      throw new NotFoundException(`Invalid ID format: ${_id}`);
    }

    const deletedCompetition = await this.competitionModel.findByIdAndDelete(_id).exec();

    if (!deletedCompetition) {
      throw new NotFoundException(`User with ID ${_id} not found`);
    }

    return deletedCompetition;

  }
}
