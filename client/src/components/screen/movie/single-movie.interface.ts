import { IGalleryItem } from '@/ui/gallery/gallery.interface'

import { IMovie } from '@/shared/interface/movie.interface'

export interface IMoviePage {
  movie: IMovie
  similarMovies: IGalleryItem[]
}
