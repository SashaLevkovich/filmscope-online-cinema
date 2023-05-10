import { INavItem } from './admin-navigation.interface'
import { getAdminHomeIdUrl, getAdminIdUrl } from '@/config/url.config'

export const navItems: INavItem[] = [
  {
    title: 'Статистика',
    link: getAdminHomeIdUrl(),
  },
  {
    title: 'Пользователи',
    link: getAdminIdUrl('users'),
  },
  {
    title: 'Фильмы',
    link: getAdminIdUrl('movies'),
  },
  {
    title: 'Актеры',
    link: getAdminIdUrl('actors'),
  },
  {
    title: 'Жанры',
    link: getAdminIdUrl('genres'),
  },
]
