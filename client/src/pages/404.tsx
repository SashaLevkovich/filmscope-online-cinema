import { FC } from 'react'

import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

const Error404: FC = () => {
  return (
    <Meta title="Страница не найдена">
      <Heading title="404 - Страница не найдена" />
    </Meta>
  )
}
export default Error404
