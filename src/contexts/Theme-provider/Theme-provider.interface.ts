import type {ReactNode} from 'react'
import type {Token, UIDensity} from '../../theme'

export interface ThemeProviderProps {
	children?: ReactNode
	token?: Omit<Token, 'styleVariables'>
	uiDensity?: UIDensity
}

export interface Theme extends Pick<ThemeProviderProps, 'uiDensity'> {
	colorScheme: 'light' | 'dark'
	token: Token
}
