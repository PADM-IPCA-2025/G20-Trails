import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {

    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

   async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(_id: string): Promise<User> {
    
    if (!Types.ObjectId.isValid(_id)) {
      throw new NotFoundException(`Invalid ID format: ${_id}`);
    }

    const user = await this.userModel.findById(_id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${_id} not found`);
    }

    return user;
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(new Types.ObjectId(_id), updateUserDto, { new: true }).exec(); 
  }

  async remove(_id: string): Promise<User> {
    
    if (!Types.ObjectId.isValid(_id)) {
      throw new NotFoundException(`Invalid ID format: ${_id}`);
    }

    const deletedUser = await this.userModel.findByIdAndDelete(_id).exec();

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${_id} not found`);
    }

    return deletedUser;

  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }
}
