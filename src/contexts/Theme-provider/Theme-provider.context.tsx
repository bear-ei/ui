import {CONTRAST, createToken, PALETTE, SCHEME, type Token} from '@bearei/theme-token'
import {useColorScheme} from 'nativewind'
import {createContext, useId, useMemo, type FC} from 'react'
import {View} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {ModalProvider} from '../Modal-provider'
import {processStyleVariables} from './Theme-provider.handler'
import type {ThemeContextOptions, ThemeProviderProps} from './Theme-provider.interface'

export const ThemeContext = createContext<ThemeContextOptions>({theme: {colorScheme: 'light', token: {} as Token}})
export const ThemeProvider: FC<ThemeProviderProps> = ({children, token: rawToken}) => {
    const {colorScheme = 'light'} = useColorScheme()
    const id = useId()
    const token =
        rawToken ??
        createToken({contrast: CONTRAST.STANDARD, scheme: colorScheme === 'light' ? SCHEME.LIGHT : SCHEME.DARK})(
            PALETTE.NAVY
        )

    const theme = useMemo(() => ({theme: {colorScheme, token}}), [colorScheme, token])
    const styleVariables = processStyleVariables(token)

    return (
        <ThemeContext.Provider value={theme}>
            <GestureHandlerRootView>
                <View
                    className='flex-1'
                    style={styleVariables}
                    testID={`provider__theme--${id}`}
                >
                    {children}
                    <ModalProvider />
                </View>
            </GestureHandlerRootView>
        </ThemeContext.Provider>
    )
}
