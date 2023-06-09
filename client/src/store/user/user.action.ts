import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorCatch } from 'api/api.helpers'
import { toastr } from 'react-redux-toastr'

import { AuthService } from '@/services/auth/auth.service'

import { toastrError } from '@/utils/toastr-error'

import { IAuthResponse, IEmailPassword } from './user.interface'

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
  'auth/register',
  async ({ email, password }, thunkApi) => {
    try {
      const response = await AuthService.register(email, password)
      toastr.success('Регистрация', 'Прошла успешно!')

      return response.data
    } catch (error) {
      toastrError(error)

      return thunkApi.rejectWithValue(error)
    }
  }
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
  'auth/login',
  async ({ email, password }, thunkApi) => {
    try {
      const response = await AuthService.login(email, password)
      toastr.success('Авторизация', 'Прошла успешно!')

      return response.data
    } catch (error) {
      toastrError(error)
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
  'auth/chek-auth',
  async (_, thunkApi) => {
    try {
      const response = await AuthService.getNewTokens()

      return response.data
    } catch (error) {
      if (errorCatch(error) === 'jwt expired ') {
        toastr.error(
          'Выход',
          'Время авторизации закончилось, пожалуйста авторизируйтесь повторно'
        )
        thunkApi.dispatch(logout())
      } else {
        toastrError(error)
      }

      return thunkApi.rejectWithValue(error)
    }
  }
)
