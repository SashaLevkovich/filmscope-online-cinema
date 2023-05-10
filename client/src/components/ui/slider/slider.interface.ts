import { IMovie } from '@/shared/interface/movie.interface'

export interface ISlide extends Pick<IMovie, '_id' | 'bigPoster' | 'title'> {
  subTitle: string
  link: string
}
