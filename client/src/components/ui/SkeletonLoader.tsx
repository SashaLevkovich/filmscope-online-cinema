import cn from 'classnames'
import { FC } from 'react'
import Skeleton, { SkeletonProps } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader: FC<SkeletonProps> = ({ className, ...rest }) => {
  return (
    <Skeleton
      {...rest}
      className={cn('rounded-lg', className)}
      baseColor="#1e293b"
      highlightColor="#cbd5e1 "
    />
  )
}
export default SkeletonLoader
