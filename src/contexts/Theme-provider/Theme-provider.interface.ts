import type {ReactNode} from 'react'
import type {Theme} from '../../theme'

export interface ThemeProviderProps {
	children?: ReactNode
	story?: boolean
	theme?: Theme
}

export interface ThemeContextOptions {
	colorScheme: 'light' | 'dark'
	theme: Theme
}
