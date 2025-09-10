import type {DefaultTheme} from 'styled-components/native'

export const getScaledSpacing =
	(density = 0) =>
	(theme: DefaultTheme) =>
		density * theme.token.spacing.extraSmall
