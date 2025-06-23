import { Controller, Get, Post, Body, Patch, Param, Delete, Req,  UnauthorizedException } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { Request } from 'express';

@Controller('entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Post()
  async create(@Body() createEntityDto: CreateEntityDto, @Req() req: Request) {
    const adminId = req.session?.user?._id;

    if (!adminId) {
      throw new UnauthorizedException('Sessão inválida');
    }
    
    return this.entitiesService.create({...createEntityDto, admin: adminId});
  }

  @Get()
  async findAll() {
    return this.entitiesService.findAll();
  }

  @Get('my')
  async findMyEntities(@Req() req: Request) {
    const user = req.session?.user;

    if (!user) {
      throw new UnauthorizedException('Não autenticado');
    }

    return this.entitiesService.findAllByAdmin(user._id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.entitiesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEntityDto: UpdateEntityDto) {
    return this.entitiesService.update(id, updateEntityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.entitiesService.remove(id);
  }
}
