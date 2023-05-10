import axios, { axiosClassic } from 'api/interceptors'

import { IMovie } from '@/shared/interface/movie.interface'

import { getMovieUrl } from '@/config/api.config'
import { getMovieSlugUrl } from '@/config/url.config'
import { IMovieEditInput } from '@/screen/admin/movie-edit/movie-edit.interface'

export const MovieService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IMovie[]>(getMovieUrl(''), {
      params: searchTerm ? { searchTerm } : {},
    })
  },

  async updateCountOpened(slug: string) {
    return axiosClassic.put(getMovieUrl('/update-count-opened'), {
      slug,
    })
  },

  async getById(_id: string) {
    return axios.get<IMovieEditInput>(getMovieUrl(`/${_id}`))
  },

  async getByActor(actorId: string) {
    return axiosClassic.get<IMovie[]>(getMovieSlugUrl(`/by-actor/${actorId}`))
  },

  async getBySlug(slug: string) {
    return axiosClassic.get<IMovie>(getMovieSlugUrl(`/by-slug/${slug}`))
  },

  async getByGenres(genreIds: string[]) {
    return axiosClassic.post<IMovie[]>(getMovieSlugUrl(`/by-genres`), {
      genreIds,
    })
  },

  async getPopular() {
    const { data: movies } = await axiosClassic.get<IMovie[]>(
      getMovieUrl('/most-popular')
    )

    return movies
  },

  async delete(id: string) {
    return axios.delete<string>(getMovieUrl(`/${id}`))
  },

  async update(id: string, data: IMovieEditInput) {
    return axios.put<string>(getMovieUrl(`/${id}`), data)
  },

  async create() {
    return axios.post<string>(getMovieUrl('/'))
  },
}
