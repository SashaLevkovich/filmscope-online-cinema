import { ActorDto } from './dto/actor.dto'
import { IdValidationPipe } from '../pipes/id-validation.pipe'
import { Auth } from 'src/auth/decorators/auth.decorator'
import {
  Controller,
  Param,
  Get,
  Query,
  UsePipes,
  Post,
  Put,
  ValidationPipe,
  Body,
  Delete,
} from '@nestjs/common'
import { ActorsService } from './actors.service'

@Controller('actors')
export class ActorsController {
  constructor (private readonly actorsService: ActorsService) {}

  @Get('by-slug/:slug')
  async getActorBySlug (@Param('slug') slug: string) {
    return this.actorsService.bySlug(slug)
  }

  @Get()
  async getAllActors (@Query('searchTerm') searchTerm?: string) {
    return this.actorsService.getAll(searchTerm)
  }

  @Get(':id')
  @Auth('admin')
  async getActorById (@Param('id', IdValidationPipe) id: string) {
    return this.actorsService.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @Auth('admin')
  async createActors () {
    return this.actorsService.create()
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Auth('admin')
  async updateActor (@Param('id') id: string, @Body() dto: ActorDto) {
    return this.actorsService.update(id, dto)
  }

  @Delete(':id')
  @Auth('admin')
  async deleteActors (@Param('id') id: string) {
    return this.actorsService.delete(id)
  }
}
