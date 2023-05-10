import { getContentType } from 'api/api.helpers'
import { axiosClassic } from 'api/interceptors'
import Cookies from 'js-cookie'

import { IAuthResponse } from '@/store/user/user.interface'

import { removeTokensFromCookie, saveToStorage } from './auth.helper'
import { getAuthUrl } from '@/config/api.config'

export const AuthService = {
  async register(email: string, password: string) {
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl('/register'),
      { email, password }
    )

    if (response.data.accessToken) saveToStorage(response.data)

    return response
  },

  async login(email: string, password: string) {
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl('/login'),
      { email, password }
    )

    if (response.data.accessToken) saveToStorage(response.data)

    return response
  },

  async logout() {
    removeTokensFromCookie()
    localStorage.removeItem('user')
  },

  async getNewTokens() {
    const refreshToken = Cookies.get('refreshToken')
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl('/login/access-token'),
      { refreshToken },
      { headers: getContentType() }
    )

    if (response.data.accessToken) saveToStorage(response.data)

    return response
  },
}
