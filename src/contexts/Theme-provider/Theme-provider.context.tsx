import {useColorScheme} from 'nativewind'
import {createContext, useId, useMemo, type FC} from 'react'
import {View} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {ModalProvider} from '../Modal-provider'
import {processStyleVariables} from './Theme-provider.handler'
import type {ThemeContextOptions, ThemeProviderProps} from './Theme-provider.interface'
import {CONTRAST, createTheme, PALETTE, SCHEME, type Theme} from '../../theme'

export const ThemeContext = createContext<ThemeContextOptions>({colorScheme: 'light', theme: {} as Theme})
export const ThemeProvider: FC<ThemeProviderProps> = ({children, theme: rawTheme}) => {
	const {colorScheme = 'light'} = useColorScheme()
	const id = useId()
	const theme =
		rawTheme ??
		createTheme()({contrast: CONTRAST.STANDARD, scheme: colorScheme === 'light' ? SCHEME.LIGHT : SCHEME.DARK})(
			PALETTE.NAVY
		)

	const providerTheme = useMemo(() => ({colorScheme, theme}), [colorScheme, theme])
	const styleVariables = processStyleVariables(theme)

	console.info(styleVariables)

	return (
		<ThemeContext.Provider value={providerTheme}>
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
