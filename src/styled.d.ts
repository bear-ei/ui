import {Token} from '@bearei/material-token'
import {ColorSchemeName} from 'react-native'
import 'styled-components/native'
import {Density} from './components'

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
