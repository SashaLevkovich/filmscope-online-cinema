import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error404 from 'pages/404'

import { GenreService } from '@/services/genre.service'
import { MovieService } from '@/services/movie.service'

import Genre from '@/screen/genre/Genre'
import { IGenrePage } from '@/screen/genre/genre.interface'

const GenrePage: NextPage<IGenrePage> = ({ genre, movies }) => {
  return genre ? <Genre genre={genre} movies={movies} /> : <Error404 />
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: genres } = await GenreService.getAll()
    const paths = genres.map(genre => ({
      params: { slug: genre.slug },
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
    const { data: genre } = await GenreService.getBySlug(String(params?.slug))

    const { data: movies } = await MovieService.getByGenres([genre._id])

    return {
      props: { movies, genre },
    }
  } catch (e) {
    return {
      props: {},
    }
  }
}

export default GenrePage
