import { IMovie } from '@/shared/interface/movie.interface'

export interface IMovieList {
  title: string
  link: string
  movies: IMovie[]
}
