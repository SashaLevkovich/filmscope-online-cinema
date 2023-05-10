import { ICollection } from './interface/genre.interface';
import { MovieService } from './../movie/movie.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { GenreModel } from './models/genre.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>,
    private readonly movieService: MovieService,
  ) {}

  async bySlug(slug: string) {
    const genre = await this.GenreModel.findOne({ slug }).exec();

    if (!genre) throw new NotFoundException('Genre not found!');

    return genre;
  }

  async getAll(searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [
          {
            name: new RegExp(searchTerm, 'i'),
          },
          {
            slug: new RegExp(searchTerm, 'i'),
          },
          {
            description: new RegExp(searchTerm, 'i'),
          },
        ],
      };
    }

    return this.GenreModel.find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .exec();
  }

  async getCollection() {
    const genres = await this.getAll();

    const collections = await Promise.all(
      genres.map(async (genre) => {
        const moviesByGenre = await this.movieService.byGenres([genre._id]);

        const result: ICollection = {
          _id: String(genre._id),
          title: genre.name,
          slug: genre.slug,
          image: moviesByGenre[0].bigPoster,
        };

        return result;
      }),
    );

    return collections;
  }

  /* Admin place */
  async create() {
    const defaultGenre: CreateGenreDto = {
      name: '',
      slug: '',
      description: '',
      icon: '',
    };

    const genre = await this.GenreModel.create(defaultGenre);
    return genre._id;
  }

  async byId(_id: string) {
    const genre = this.GenreModel.findById(_id).exec();

    if (!genre) throw new NotFoundException('Genre not found!');

    return genre;
  }

  async update(_id: string, dto: CreateGenreDto) {
    const updateGenre = await this.GenreModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec();

    if (!updateGenre) throw new NotFoundException('Genre not found');

    return updateGenre;
  }

  async delete(_id: string) {
    const deleteGenre = await this.GenreModel.findByIdAndDelete(_id);
    if (!deleteGenre) throw new NotFoundException('Genre not found');

    return deleteGenre;
  }
}
