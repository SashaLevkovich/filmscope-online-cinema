import { NextPage } from 'next'
import { ReactNode } from 'react'

export type TypeRole = {
  isOnlyAdmin?: boolean
  isOnlyUser?: boolean
}

export type NextPageAuth<P = {}> = NextPage<P> & TypeRole

export type TypeComponentAuthFields = {
  Component: TypeRole
  children: ReactNode
}
