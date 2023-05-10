import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error404 from 'pages/404'

import { ActorService } from '@/services/actor.service'
import { GenreService } from '@/services/genre.service'
import { MovieService } from '@/services/movie.service'

import Actor from '@/screen/actor/Actor'
import { IActorPage } from '@/screen/actor/actor.interface'

const ActorPage: NextPage<IActorPage> = ({ actor, movies }) => {
  return actor ? <Actor actor={actor} movies={movies} /> : <Error404 />
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: actors } = await GenreService.getAll()
    const paths = actors.map(actor => ({
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
    const { data: actor } = await ActorService.getBySlug(String(params?.slug))

    console.log(actor)

    const { data: movies } = await MovieService.getByActor(actor._id)

    return {
      props: { movies, actor },
    }
  } catch (e) {
    return {
      props: {},
    }
  }
}

export default ActorPage
