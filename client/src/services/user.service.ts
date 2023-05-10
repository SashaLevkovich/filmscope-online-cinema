import axios from 'api/interceptors'

import { IMovie } from '@/shared/interface/movie.interface'
import { IUser } from '@/shared/interface/user.interface'

import { getUserUrl } from '@/config/api.config'
import { IProfileInput } from '@/screen/profile/profile.interface'

export const UserService = {
  async getAll(searchTerm?: string) {
    return axios.get<IUser[]>(getUserUrl(''), {
      params: searchTerm ? { searchTerm } : {},
    })
  },

  async getFavorites() {
    return axios.get<IMovie[]>(getUserUrl('/profile/favorites'))
  },

  async toggleFavorites(movieId: string) {
    return axios.put<IMovie[]>(getUserUrl('/profile/favorites'), { movieId })
  },

  async getProfile() {
    return axios.get<IUser>(getUserUrl('/profile'))
  },

  async updateProfile(data: IProfileInput) {
    return axios.put<string>(getUserUrl('/profile'), data)
  },

  async getById(_id: string) {
    return axios.get<IUser>(getUserUrl(`/${_id}`))
  },

  async update(id: string, data: IProfileInput) {
    return axios.put<string>(getUserUrl(`/${id}`), data)
  },

  async delete(id: string) {
    return axios.delete<string>(getUserUrl(`/${id}`))
  },
}
