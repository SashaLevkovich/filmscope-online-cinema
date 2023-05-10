import { IMovie } from '@/shared/interface/movie.interface'

export interface ICatalog {
  title: string
  description?: string
  movies: IMovie[]
}
