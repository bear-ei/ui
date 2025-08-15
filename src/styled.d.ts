import type {Token} from '@bearei/element-token'
import 'styled-components/native'
import type {Density} from './components'

declare module 'styled-components/native' {
	export interface DefaultTheme {
		adaptFontSize: (size: number) => number
		adaptSize: (size: number) => number
		density: Density
		OS: 'ios' | 'android' | 'windows' | 'macos' | 'web'
		token: Token
	}
}
