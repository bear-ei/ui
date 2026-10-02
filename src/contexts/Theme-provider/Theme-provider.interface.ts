import type {ReactNode} from 'react'
import type {Token} from '../../theme'

export interface ThemeProviderProps {
	children?: ReactNode
	story?: boolean
	token?: Token
}

export interface Theme {
	colorScheme: 'light' | 'dark'
	token: Token
}
