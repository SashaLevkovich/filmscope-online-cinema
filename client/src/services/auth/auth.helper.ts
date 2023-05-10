import Cookies from 'js-cookie'

import { IAuthResponse, IToken } from '@/store/user/user.interface'

export const saveTokensToCookie = (data: IToken) => {
  Cookies.set('accessToken', data.accessToken)
  Cookies.set('refreshToken', data.refreshToken)
}

export const removeTokensFromCookie = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensToCookie(data)
  localStorage.setItem('user', JSON.stringify(data.user))
}


