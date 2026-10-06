import {useColorScheme} from 'nativewind'
import {createContext, useId, useMemo, type FC} from 'react'
import {View} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {ModalProvider} from '../Modal-provider'
import type {Theme, ThemeProviderProps} from './Theme-provider.interface'
import {CONTRAST, createToken, PALETTE, SCHEME, type Token} from '../../theme'

export const ThemeContext = createContext<Theme>({colorScheme: 'light', token: {} as Token})
export const ThemeProvider: FC<ThemeProviderProps> = ({children, token: rawToken}) => {
	const {colorScheme = 'light'} = useColorScheme()
	const id = useId()
	const {styleVariables, ...token} =
		rawToken ??
		createToken()({contrast: CONTRAST.STANDARD, scheme: colorScheme === 'light' ? SCHEME.LIGHT : SCHEME.DARK})(
			PALETTE.NAVY
		)

	const providerTheme = useMemo(() => ({colorScheme, token}), [colorScheme, token])

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
