import {useColorScheme} from 'nativewind'
import {createContext, useId, useMemo, type FC} from 'react'
import {View} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import type {Theme, ThemeProviderProps} from './Theme-provider.interface'

import {CONTRAST, createToken, PALETTE, processStyleVariables, SCHEME, UI_DENSITY, type Token} from '../../theme'
import {PortalProvider} from '../Portal-provider'

const GESTURE_ROOT_STYLE = {flex: 1}

/**
 * Sentinel value used to detect "used outside ThemeProvider".
 * MUST never be mutated — its reference identity is the entire mechanism.
 * See use-theme.hook.ts for the check.
 */
export const FALLBACK_THEME: Theme = {colorScheme: 'light', token: {} as Token, uiDensity: UI_DENSITY.COMPACT}
export const ThemeContext = createContext<Theme>(FALLBACK_THEME)
export const ThemeProvider: FC<ThemeProviderProps> = ({children, token: rawToken, uiDensity = UI_DENSITY.COMPACT}) => {
	const {colorScheme = 'light'} = useColorScheme()
	const id = useId()
	const token = useMemo(
		() =>
			rawToken ??
			createToken(
				PALETTE.NAVY,
				{contrast: CONTRAST.STANDARD, scheme: colorScheme === 'dark' ? SCHEME.DARK : SCHEME.LIGHT},
				{density: uiDensity}
			),
		[rawToken, uiDensity, colorScheme]
	)

	const providerTheme = useMemo(() => ({colorScheme, token, uiDensity}), [colorScheme, token, uiDensity])
	const styleVariables = useMemo(() => processStyleVariables(token), [token])

	return (
		<ThemeContext.Provider value={providerTheme}>
			<GestureHandlerRootView style={GESTURE_ROOT_STYLE}>
				<View
					className='flex-1'
					style={styleVariables}
					testID={`provider__theme--${id}`}
				>
					{children}
					<PortalProvider />
				</View>
			</GestureHandlerRootView>
		</ThemeContext.Provider>
	)
}
