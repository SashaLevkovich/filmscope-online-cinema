import dynamic from 'next/dynamic'
import { FC } from 'react'

import Banner from '@/ui/banner/Banner'
import Gallery from '@/ui/gallery/Gallery'
import SubHeading from '@/ui/heading/SubHeading'

import Meta from '@/utils/meta/Meta'

import Content from './Content/Content'
import { IMoviePage } from './single-movie.interface'
import { useUpdatedCountOpened } from './useUpdatedCountOpened'

const DynamicVideoPlayer = dynamic(
  () => import('@/ui/video-player/VideoPlayer'),
  {
    ssr: false,
  }
)

const DynamicRatingMovie = dynamic(
  () => import('@/ui/ratiting-movie/RatingMovie'),
  {
    ssr: false,
  }
)

const Movie: FC<IMoviePage> = ({ similarMovies, movie }) => {
  useUpdatedCountOpened(movie.slug)

  return (
    <Meta
      title={movie?.title || 'Смотреть онлайн'}
      description={`Смотреть ${movie?.title || 'Фильм'}`}
    >
      <Banner
        imagePath={movie?.bigPoster || ''}
        Detail={() => <Content movie={movie} />}
      />

      <DynamicVideoPlayer
        slug={movie.slug}
        videoSource={movie.videoUrl}
        isPublic
      />

      {movie.filmUrl ? (
        <DynamicVideoPlayer
          slug={movie.slug}
          videoSource={movie.filmUrl}
          isPublic={false}
        />
      ) : null}

      <DynamicRatingMovie id={movie._id} slug={movie.slug} />

      <div className="mt-12">
        <SubHeading title="Похожие" />
        <Gallery items={similarMovies} />
      </div>
    </Meta>
  )
}
export default Movie
