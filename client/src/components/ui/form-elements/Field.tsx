import cn from 'classnames'
import { forwardRef } from 'react'

import styles from './FormElement.module.scss'
import { IField } from './form.interface'

const Field = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, error, type = 'text', style, ...rest }, ref) => {
    return (
      <div className={cn(styles.common, styles.field)}>
        <label>
          <span>{placeholder}</span>
          <input ref={ref} type={type} {...rest} autoComplete="off" />
        </label>
        {error && (
          <div className={styles.error}>
            <>{error.message}</>
          </div>
        )}
      </div>
    )
  }
)

Field.displayName = 'Field'
export default Field
