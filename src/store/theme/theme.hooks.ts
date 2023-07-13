import { useAppDispatch, useAppSelector } from '..'
import { ITheme, toggleTheme } from './theme.slice'

export function useToggleTheme() {
  const theme = useAppSelector((state) => state.theme.theme)
  const dispatch = useAppDispatch()

  const toggle = (theme?: ITheme) => {
    dispatch(toggleTheme(theme || null))
  }

  return { theme, toggle }
}
