import {Token, WindowSize} from '@bearei/material-token'
import {ColorSchemeName} from 'react-native'
import 'styled-components/native'

declare module 'styled-components/native' {
    export interface DefaultTheme {
        adaptFontSize: (size: number) => number
        adaptSize: (size: number) => number
        colorScheme: ColorSchemeName
        OS: 'ios' | 'android' | 'windows' | 'macos' | 'web'
        token: Token
        windowSize: WindowSize
    }
}
