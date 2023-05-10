import { IUser } from '@/shared/interface/user.interface'
 
export interface IProfileInput extends Pick<IUser, 'email' | 'password'> {}
