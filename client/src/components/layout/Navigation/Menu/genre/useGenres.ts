import { useQuery } from 'react-query'

import { GenreService } from '@/services/genre.service'

import { getGenreSlugUrl } from '@/config/url.config'
import { IMenuItem } from '@/layout/Navigation/Menu/menu.interface'

export const useGenre = () => {
  const queryData = useQuery('genre navmenu', () => GenreService.getAll(), {
    select: ({ data }) =>
      data
        .filter(genre => genre.icon )
        .map(
          genre =>
            ({
              icon: genre.icon,
              link: getGenreSlugUrl(genre.slug),
              title: genre.name,
            } as IMenuItem)
        )
        .splice(0, 4),
  })
  return queryData
}
