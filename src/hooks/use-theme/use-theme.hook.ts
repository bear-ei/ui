import {useContext} from 'react'
import {EMPTY_THEME, ThemeContext} from '../../contexts'

export const useTheme = () => {
	const theme = useContext(ThemeContext)

	if (theme === EMPTY_THEME) {
		throw new Error('useTheme must be used within ThemeProvider')
	}

	return theme
}
