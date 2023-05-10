import { ActorDto } from './dto/actor.dto'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { ActorModel } from './models/actor.model'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ActorsService {
  constructor (
    @InjectModel(ActorModel) private readonly ActorModel: ModelType<ActorModel>,
  ) {}

  async bySlug (slug: string) {
    const actor = await this.ActorModel.findOne({ slug }).exec()

    if (!actor) throw new NotFoundException('Actor not found!')

    return actor
  }

  async getAll (searchTerm: string) {
    let options = {}

    if (searchTerm)
      options = {
        $or: [
          {
            name: new RegExp(searchTerm, 'i'),
          },
          {
            slug: new RegExp(searchTerm, 'i'),
          },
        ],
      }

    return this.ActorModel.aggregate().match(options).lookup({
      from: 'Movie',
      localField: '_id',
      foreignField: 'actors',
      as: 'movies',
    }).addFields({ countMovies: { $size: '$movies' } }).project({
      __v: 0,
      updatedAt: 0,
      movies: 0,
    }).sort({ createdAt: -1 }).exec()
  }

  /*Admin place*/
  async create () {
    const defaultActor: ActorDto = {
      name: '',
      slug: '',
      photo: '',
    }

    const actor = await this.ActorModel.create(defaultActor)

    return actor._id
  }

  async byId (_id: string) {
    const actor = await this.ActorModel.findById(_id).exec()

    if (!actor) throw new NotFoundException('Actor not found!')

    return actor
  }

  async update (_id: string, dto: ActorDto) {
    const updateActor = await this.ActorModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec()

    if (!updateActor) throw new NotFoundException('Actor not found!')

    return updateActor
  }

  async delete (_id: string) {
    const deleteActor = await this.ActorModel.findByIdAndDelete(_id)

    if (!deleteActor) throw new NotFoundException('Actor not found!')

    return deleteActor
  }
}
