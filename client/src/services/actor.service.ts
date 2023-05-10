import axios, { axiosClassic } from 'api/interceptors'

import { IActor } from '@/shared/interface/movie.interface'

import { getActorUrl } from '@/config/api.config'
import { getActorSlugUrl } from '@/config/url.config'
import { IActorEditInput } from '@/screen/admin/actor-edit/actor-edit.interface'

export const ActorService = {
  async getAll(searchTerm?: string) {
    return axios.get<IActor[]>(getActorUrl(''), {
      params: searchTerm ? { searchTerm } : {},
    })
  },

  async getBySlug(slug: string) {
    return axiosClassic.get<IActor>(getActorSlugUrl(`/by-slug/${slug}`))
  },

  async getById(_id: string) {
    return axios.get<IActorEditInput>(getActorUrl(`/${_id}`))
  },

  async delete(id: string) {
    return axios.delete<string>(getActorUrl(`/${id}`))
  },

  async update(id: string, data: IActorEditInput) {
    return axios.put<string>(getActorUrl(`/${id}`), data)
  },

  async create() {
    return axios.post<string>(getActorUrl('/'))
  },
}
