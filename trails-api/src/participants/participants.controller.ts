import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Request } from 'express';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  async create(@Body() createParticipantDto: CreateParticipantDto, @Req() req: Request) {
    const userId = req.session?.user?._id;

    if (!userId) throw new UnauthorizedException();

    return this.participantsService.create(createParticipantDto, userId);
  }

  @Get()
  async findAll() {
    return this.participantsService.findAll();
  }

  @Get('my-competitions')
  async getMyCompetitions(@Req() req: Request) {
    const user = req.session?.user;
  
    if (!user) {
      throw new UnauthorizedException();
    }
    
    const competitions = await this.participantsService.getCompetitionsForParticipant(user._id);
    return competitions;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.participantsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantsService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.participantsService.remove(id);
  }

  @Post('register/:competitionId')
  async registerToCompetition(@Param('competitionId') competitionId: string, @Req() req: any) {
    const user = req.session?.user;

    if (!user || user.role !== 'participant') {
      throw new BadRequestException('Não autenticado como participante');
    }

    return this.participantsService.registerToCompetition(user._id, competitionId);
  }

}
