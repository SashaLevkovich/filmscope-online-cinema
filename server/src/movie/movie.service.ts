import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { UpdateCountDto } from './dto/update-count-opened.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieModel } from './model/movie.model';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>,
  ) {}

  async bySlug(slug: string) {
    const movies = await this.MovieModel.findOne({ slug })
      .populate('actors genres')
      .exec();

    if (!movies) throw new NotFoundException('Фильм не найден');

    return movies;
  }

  async byActor(actorId: Types.ObjectId) {
    const actors = await this.MovieModel.find({ actors: actorId }).exec();

    if (!actors) throw new NotFoundException('Фильмы не найдены');

    return actors;
  }

  async byGenres(genreIds: Types.ObjectId[]) {
    const genres = await this.MovieModel.find({
      genres: { $in: genreIds },
    }).exec();

    if (genres?.length === 0) throw new NotFoundException('Фильмы не найдены');

    return genres;
  }

  async getAll(searchTerm?: string) {
    let options = {};

    if (searchTerm)
      options = {
        $or: [
          {
            title: new RegExp(searchTerm, 'i'),
          },
        ],
      };

    return this.MovieModel.find(options)
      .select('-updatedAt -__v')
      .sort('desc')
      .populate('actors genres')
      .exec();
  }

  async updateCountOpened({ slug }: UpdateCountDto) {
    const updateMovie = await this.MovieModel.findOneAndUpdate(
      { slug },
      {
        $inc: { countOpened: 1 },
      },
      {
        new: true,
      },
    ).exec();

    if (!updateMovie) throw new NotFoundException('Фильм не найден');

    return updateMovie;
  }

  async updateRating(id: Types.ObjectId, newRating: number) {
    return this.MovieModel.findByIdAndUpdate(
      id,
      {
        rating: newRating,
      },
      {
        new: true,
      },
    ).exec();
  }

  async getMostPopular() {
    return this.MovieModel.find({ countOpened: { $gt: 1 } })
      .populate('genres')
      .sort({ countOpened: -1 })
      .exec();
  }

  /*Admin place*/
  async create() {
    const defaultMovie: UpdateMovieDto = {
      bigPoster: '',
      genres: [],
      actors: [],
      title: '',
      poster: '',
      slug: '',
      videoUrl: '',
      filmUrl: '',
    };

    const movie = await this.MovieModel.create(defaultMovie);
    return movie._id;
  }

  async byId(_id: string) {
    const movie = await this.MovieModel.findById(_id).exec();
    if (!movie) throw new NotFoundException('Фильм не найден');

    return movie;
  }

  async update(_id: string, dto: UpdateMovieDto) {
    const updateMovie = await this.MovieModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec();

    if (!updateMovie) throw new NotFoundException('Фильм не найден');

    return updateMovie;
  }

  async delete(_id: string) {
    const deleteMovie = await this.MovieModel.findByIdAndDelete(_id);

    if (!deleteMovie) throw new NotFoundException('Фильм не найден');

    return deleteMovie;
  }
}
