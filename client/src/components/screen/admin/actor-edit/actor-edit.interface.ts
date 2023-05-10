import { IActor } from '@/shared/interface/movie.interface'

export interface IActorEditInput extends Omit<IActor, '_id'> {}
