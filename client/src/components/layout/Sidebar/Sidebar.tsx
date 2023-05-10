import { FC } from 'react'

import MovieContainer from './MoviesContainer/MovieContainer'
import Search from './Search/Search'
import styles from './Sidebar.module.scss'

const Sidebar: FC = () => {
  return (
    <aside className={styles.sidebar}>
      <Search />
      <MovieContainer />
    </aside>
  )
}
export default Sidebar
