import { FC } from 'react'

import Gallery from '@/ui/gallery/Gallery'
import Heading from '@/ui/heading/Heading'
import SubHeading from '@/ui/heading/SubHeading'
import Slider from '@/ui/slider/Slider'

import Meta from '@/utils/meta/Meta'

import { IHome } from './home.interface'

const Home: FC<IHome> = ({ slides, actors, trendingMovies }) => {
  return (
    <Meta
      title="Смотреть фильмы онлайн"
      description="Смотрите фильмы и ТВ-шоу онлайн или поток прямо в браузере."
    >
      <Heading
        title="Смотреть фильмы онлайн"
        className="text-gray-50 mb-8 text-xl"
      />

      {slides.length && <Slider slides={slides} />}

      <div className="my-10">
        <SubHeading title="Сейчас в тренде" />
        {trendingMovies.length && <Gallery items={trendingMovies} />}
      </div>

      <div className="my-10">
        <SubHeading title="Актеры" />
        {actors.length && <Gallery items={actors} />}
      </div>
    </Meta>
  )
}
export default Home
