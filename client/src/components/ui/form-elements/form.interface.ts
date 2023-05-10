import { EditorProps } from 'draft-js'
import { ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IFieldInput {
  placeholder: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

type FieldInputType = InputHTMLAttributes<HTMLInputElement> & IFieldInput

export interface IField extends FieldInputType {}

type TypeEditorPropsField = EditorProps & IField

export interface ITextEditor extends Omit<TypeEditorPropsField, 'editorState'> {
  onChange: (...event: any[]) => void
  value: string
}

export interface IUploadFile {
  folder?: string
  value?: string
  onChange: (...event: any[]) => void
  placeholder: string
  error?: FieldError
  style?: CSSProperties
  isNoImage?: boolean
}
