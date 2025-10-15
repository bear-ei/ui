import type {Token} from '@bearei/theme-token'
import type {ReactNode} from 'react'

export interface ThemeProviderProps {
        children?: ReactNode
        story?: boolean
}

export interface Theme {
        colorScheme: 'light' | 'dark'
        token: Token
}

export interface ThemeContextOptions {
        theme: Theme
}
