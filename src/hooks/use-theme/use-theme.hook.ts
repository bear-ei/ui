import {useContext} from 'react'

import {EMPTY_THEME, ThemeContext} from '../../contexts'

export const useTheme = () => {
	const theme = useContext(ThemeContext)

	if (theme === EMPTY_THEME) {
		throw new Error(
			`[useTheme] ThemeProvider not found. Wrap your component tree with <ThemeProvider>
			or check that this hook is not called outside the provider subtree.`
		)
	}

	return theme
}
