import { IUser } from '@/shared/interface/user.interface'

export interface IUserEditInput extends Omit<IUser, '_id' | 'createdAt'> {}
