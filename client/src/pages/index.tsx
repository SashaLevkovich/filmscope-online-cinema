import { GetStaticProps, NextPage } from 'next'

import { IGalleryItem } from '@/ui/gallery/gallery.interface'
import { ISlide } from '@/ui/slider/slider.interface'

import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresListEach'

import { getActorSlugUrl, getMovieSlugUrl } from '@/config/url.config'
import Home from '@/screen/home/Home'
import { IHome } from '@/screen/home/home.interface'

const HomePage: NextPage<IHome> = ({ slides, actors, trendingMovies }) => {
  return (
    <>
      <Home slides={slides} actors={actors} trendingMovies={trendingMovies} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: movies } = await MovieService.getAll()

    const slides: ISlide[] = movies.slice(0, 5).map(m => ({
      _id: m._id,
      link: getMovieSlugUrl(m.slug),
      subTitle: getGenresList(m.genres),
      title: m.title,
      bigPoster: m.bigPoster,
    }))

    const { data: dataActors } = await ActorService.getAll()

    const actors: IGalleryItem[] = dataActors.slice(0, 7).map(actor => ({
      name: actor.name,
      posterPath: actor.photo,
      link: getActorSlugUrl(actor.slug),
      content: {
        title: actor.name,
        subtitle: `+${actor.countMovies} фильмов`,
      },
    }))


    const dataTrendingMovies = await MovieService.getPopular()

    const trendingMovies: IGalleryItem[] =  dataTrendingMovies
      .slice(0, 8)
      .map(movie => ({
        name: movie.title,
        link: getMovieSlugUrl(movie.slug),
        posterPath: movie.poster,
      }))

    return {
      props: {
        slides,
        actors,
        trendingMovies,
      } as IHome,
      revalidate: 60,
    }
  } catch (error) {
    return {
      props: {
        slides: [],
        actors: [],
        trendingMovies: [],
      },
    }
  }
}

export default HomePage
