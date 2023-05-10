import { ControllerRenderProps } from 'react-hook-form'
import { Options } from 'react-select'

import { IFieldInput } from '../form-elements/form.interface'

export interface IOption {
  value: string
  label: string
}

export interface ISelect extends IFieldInput {
  options: Options<IOption>
  isMulti?: boolean
  field: ControllerRenderProps<any, any>
  isLoading?: boolean
}
