import {CONTRAST, createToken, PALETTE, SCHEME, Token} from '@bearei/theme-token'
import {useColorScheme} from 'nativewind'
import {createContext, useId, type FC} from 'react'
import {View} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {ModalProvider} from '../Modal-provider'
import {processCssVariables} from './Theme-provider.handler'
import type {ThemeContextOptions, ThemeProviderProps} from './Theme-provider.interface'

export const ThemeContext = createContext<ThemeContextOptions>({
        theme: {colorScheme: 'light', token: {} as Token}
})

export const ThemeProvider: FC<ThemeProviderProps> = ({children}) => {
        const {colorScheme = 'light'} = useColorScheme()
        const id = useId()
        const token = createToken({
                contrast: CONTRAST.STANDARD,
                scheme: colorScheme === 'light' ? SCHEME.LIGHT : SCHEME.DARK
        })(PALETTE.NAVY)

        const variables = processCssVariables(token)

        return (
                <ThemeContext.Provider value={{theme: {colorScheme, token}}}>
                        <GestureHandlerRootView>
                                <View
                                        className='flex-1'
                                        style={variables}
                                        testID={`root--${id}`}
                                >
                                        {children}
                                        <ModalProvider />
                                </View>
                        </GestureHandlerRootView>
                </ThemeContext.Provider>
        )
}
