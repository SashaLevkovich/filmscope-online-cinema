import cn from 'classnames'
import { FC } from 'react'

import styles from './FormElement.module.scss'
import { IButton } from './form.interface'

const Button: FC<IButton> = ({ className, children, ...rest }) => {
  return (
    <button className={cn(styles.button, className)} {...rest}>
      {children}
    </button>
  )
}
export default Button
