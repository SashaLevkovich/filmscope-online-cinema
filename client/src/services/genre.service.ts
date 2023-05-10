import axios, { axiosClassic } from 'api/interceptors'

import { IGenre } from '@/shared/interface/movie.interface'

import { getGenreUrl } from '@/config/api.config'
import { getGenreSlugUrl } from '@/config/url.config'
import { IGenreEditInput } from '@/screen/admin/genre-edit/genre-edit.interface'
import { ICollection } from '@/screen/collections/collection.interface'

export const GenreService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IGenre[]>(getGenreUrl(''), {
      params: searchTerm ? { searchTerm } : {},
    })
  },

  async getById(_id: string) {
    return axios.get<IGenreEditInput>(getGenreUrl(`/${_id}`))
  },

  async getBySlug(slug: string) {
    return axiosClassic.get<IGenre>(getGenreSlugUrl(`/by-slug/${slug}`))
  },

  async delete(id: string) {
    return axios.delete<string>(getGenreUrl(`/${id}`))
  },

  async getCollections() {
    return axiosClassic.get<ICollection[]>(getGenreUrl('/collections'))
  },

  async update(id: string, data: IGenreEditInput) {
    return axios.put<string>(getGenreUrl(`/${id}`), data)
  },

  async create() {
    return axios.post<string>(getGenreUrl('/'))
  },
}
