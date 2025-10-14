import {CONTRAST, createToken, PALETTE, SCHEME, Token} from '@bearei/theme-token'
import {cssInterop, useColorScheme} from 'nativewind'
import {createContext, useId, useMemo, type FC} from 'react'
import {TextInput, View} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import {ModalProvider} from '../Modal-provider'
import {processCssVariables} from './Theme-provider.handler'
import type {ThemeContextOptions, ThemeProviderProps} from './Theme-provider.interface'

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

/**
 * FIXME:
 *
 * Temporarily trigger Animated to correctly handle nativewind style
 */
cssInterop(Animated.View, {className: 'style'})
cssInterop(Animated.Text, {className: 'style'})
cssInterop(AnimatedTextInput, {className: 'style'})

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

        const theme = useMemo(() => ({theme: {colorScheme, token}}), [colorScheme, token])
        const variables = processCssVariables(token)

        return (
                <ThemeContext.Provider value={theme}>
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
