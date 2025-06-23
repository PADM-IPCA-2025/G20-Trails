import { Module } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { EntitiesController } from './entities.controller';
import { Entity, EntitySchema } from './schemas/entity.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Entity.name, schema: EntitySchema},
        { name: 'User', schema: UserSchema }])
    ],
  controllers: [EntitiesController],
  providers: [EntitiesService],
})
export class EntitiesModule {}
