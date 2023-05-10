import { FC } from 'react'

import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

const Error500: FC = () => {
  return (
    <Meta title="Внутренняя ошибка сервера">
      <Heading title="500 - Внутренняя ошибка сервера" />
    </Meta>
  )
}
export default Error500
