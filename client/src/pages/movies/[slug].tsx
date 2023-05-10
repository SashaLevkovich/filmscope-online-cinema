import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error404 from 'pages/404'

import { IGalleryItem } from '@/ui/gallery/gallery.interface'

import { MovieService } from '@/services/movie.service'

import { getMovieSlugUrl } from '@/config/url.config'
import Movie from '@/screen/movie/Movie'
import { IMoviePage } from '@/screen/movie/single-movie.interface'

const MoviePage: NextPage<IMoviePage> = ({ movie, similarMovies }) => {
  return movie ? (
    <Movie similarMovies={similarMovies || []} movie={movie} />
  ) : (
    <Error404 />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: movies } = await MovieService.getAll()
    const paths = movies.map(actor => ({
      params: { slug: actor.slug },
    }))

    return {
      paths,
      fallback: 'blocking',
    }
  } catch (e) {
    return {
      paths: [],
      fallback: false,
    }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data: movie } = await MovieService.getBySlug(String(params?.slug))

    const { data: dataSimilarMovies } = await MovieService.getByGenres(
      movie.genres.map(genre => genre._id)
    )

    const similarMovies: IGalleryItem[] = dataSimilarMovies
      .filter(m => m._id !== movie._id)
      .map(movie => ({
        name: movie.title,
        posterPath: movie.poster,
        link: getMovieSlugUrl(movie.slug),
      }))

    return {
      props: { similarMovies , movie },
    }
  } catch (e) {
    return {
      props: {},
    }
  }
}

export default MoviePage
