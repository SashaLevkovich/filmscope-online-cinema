import { IGenre, IMovie } from '@/shared/interface/movie.interface'

export interface IGenrePage {
  movies: IMovie[]
  genre: IGenre | undefined
}
