import { IActor, IMovie } from '@/shared/interface/movie.interface'

export interface IActorPage {
  movies: IMovie[]
  actor: IActor | undefined
}
