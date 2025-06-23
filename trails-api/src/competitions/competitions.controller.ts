import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Post()
  async create(@Body() createCompetitionDto: CreateCompetitionDto) {
    return this.competitionsService.create(createCompetitionDto);
  }

  @Get()
  async findAll() {
    return this.competitionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.competitionsService.findOne(id);
  }

  @Get('entity/:id')
  async findByEntity(@Param('id') entityId: string) {
      return this.competitionsService.findByEntity(entityId);
  }

  @Get('search')
  async search(@Query('q') q: string) {
    return this.competitionsService.searchCompetitions(q);
  }

  @Get(':id/participants')
  async getParticipants(@Param('id') id: string) {
    return this.competitionsService.getParticipants(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCompetitionDto: UpdateCompetitionDto) {
    return this.competitionsService.update(id, updateCompetitionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.competitionsService.remove(id);
  }
}
