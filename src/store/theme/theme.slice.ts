import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const themes: Record<string, ITheme> = {
  dark: 'DARK',
  light: 'LIGHT',
}

const COOKIE_THEME_NAME = 'app-theme'

const initialState: IThemeState = {
  theme: Cookies.get(COOKIE_THEME_NAME) as ITheme,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state, action: PayloadAction<ITheme | null>) {
      if (action.payload) {
        state.theme = action.payload
      } else {
        state.theme = state.theme == themes.dark ? themes.light : themes.dark
      }

      document.body.classList.toggle('dark', state.theme == themes.dark)

      Cookies.set(COOKIE_THEME_NAME, state.theme, {
        expires: new Date('3000-01-01'),
      })
    },
  },
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer

export type ITheme = 'DARK' | 'LIGHT'

interface IThemeState {
  theme: ITheme
}
