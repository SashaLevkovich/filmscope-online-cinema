import { IMovie } from '@/shared/interface/movie.interface'

export interface IMovieEditInput extends Omit<IMovie, '_id'> {}
 