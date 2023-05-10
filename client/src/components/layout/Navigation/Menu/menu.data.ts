import { IMenu } from './menu.interface'

export const firstMenu: IMenu = {
  title: 'Меню',
  items: [
    {
      icon: 'MdHome',
      link: '/',
      title: 'Главная',
    },
    {
      icon: 'MdExplore',
      link: '/collection',
      title: 'Коллекции',
    },
    {
      icon: 'MdFiberNew',
      link: '/fresh',
      title: 'Новинки',
    },
    {
      icon: 'MdLocalFireDepartment',
      link: '/trending',
      title: 'Сейчас в тренде',
    },
  ],
}

export const userMenu: IMenu = {
  title: 'Пользователь',
  items: [],
}
