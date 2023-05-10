import { GetStaticProps, NextPage } from 'next'

import Catalog from '@/ui/catalog-movies/Catalog'

import { IMovie } from '@/shared/interface/movie.interface'

import { MovieService } from '@/services/movie.service'

const FreshPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
  return (
    <Catalog
      movies={movies || []}
      title="Новинки"
      description="Новые фильмы и серии в отличном качестве: легальные, безопасные, без рекламы"
    />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: movies } = await MovieService.getAll()

    return {
      props: {
        movies,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default FreshPage
