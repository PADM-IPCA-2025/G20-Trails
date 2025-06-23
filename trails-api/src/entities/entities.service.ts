import { Injectable } from '@nestjs/common';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Entity } from './schemas/entity.schema';
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class EntitiesService {
  constructor(@InjectModel(Entity.name) private entityModel: Model<Entity>) {}

  async create(createEntityDto: CreateEntityDto & {admin: string}): Promise<Entity> {
  
      const createdEntity = new this.entityModel(createEntityDto);
  
      return createdEntity.save();
  }

  async findAll(): Promise<Entity[]> {
      return this.entityModel.find().populate('admin','username').exec();
  }

  async findAllByAdmin(adminId: string): Promise<Entity[]> {
    return this.entityModel
      .find({ admin: adminId })
      .populate('admin', 'username')
      .exec();
  }

  async findOne(_id: string): Promise<Entity> {
      
      if (!Types.ObjectId.isValid(_id)) {
        throw new NotFoundException(`Invalid ID format: ${_id}`);
      }
  
      const entity = await this.entityModel.findById(_id).populate('admin','username').exec();
  
      if (!entity) {
        throw new NotFoundException(`User with ID ${_id} not found`);
      }
  
      return entity;
    }

  async update(_id: string, updateEntityDto: UpdateEntityDto): Promise<Entity | null> {
      return this.entityModel.findByIdAndUpdate(new Types.ObjectId(_id), updateEntityDto, { new: true }).exec(); 
    }

  async remove(_id: string): Promise<Entity> {
      
      if (!Types.ObjectId.isValid(_id)) {
        throw new NotFoundException(`Invalid ID format: ${_id}`);
      }
  
      const deletedEntity = await this.entityModel.findByIdAndDelete(_id).exec();
  
      if (!deletedEntity) {
        throw new NotFoundException(`User with ID ${_id} not found`);
      }
  
      return deletedEntity;
  
    }
}
