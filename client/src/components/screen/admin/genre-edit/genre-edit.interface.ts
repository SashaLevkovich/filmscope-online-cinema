import { IGenre } from '@/shared/interface/movie.interface'

export interface IGenreEditInput extends Omit<IGenre, '_id'> {}
 