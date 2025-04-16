import type {Token} from '@bearei/material-token'
import type {ColorSchemeName} from 'react-native'
import 'styled-components/native'
import type {Density} from './components'

declare module 'styled-components/native' {
	export interface DefaultTheme {
		adaptFontSize: (size: number) => number
		adaptSize: (size: number) => number
		colorScheme: ColorSchemeName
		density: Density
		OS: 'ios' | 'android' | 'windows' | 'macos' | 'web'
		token: Token
	}
}
