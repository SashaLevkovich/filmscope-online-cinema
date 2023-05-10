import { GetStaticProps, NextPage } from 'next'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import Catalog from '@/ui/catalog-movies/Catalog'

import { MovieService } from '@/services/movie.service'

const TrendingPage: NextPage = () => {
  const { data: popularMovies } = useQuery('Popular movies', () =>
    MovieService.getPopular()
  )

  return (
    <Catalog
      movies={popularMovies || []}
      title="Сейчас в тренде"
      description="Трендовые фильмы в отличном качестве: легально, безопасно, без рекламы"
    />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('Popular movies', () =>
    MovieService.getPopular()
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  }
}

export default TrendingPage
