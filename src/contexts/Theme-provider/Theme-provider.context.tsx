import type {Platform, Scheme} from '@bearei/material-token'
import {CONTRAST, token as materialToken, PALETTE, SCHEME, WINDOW_SIZE} from '@bearei/material-token'
import type {FC} from 'react'
import {useId, useRef} from 'react'
import {Platform as RNPlatform, useColorScheme, View} from 'react-native'
import {ThemeProvider as StyledComponentThemeProvider} from 'styled-components/native'
import {DENSITY} from '../../components'
import {useWindowSize} from '../../hooks'
import {adaptWindow} from '../../utils'
import {ModalProvider} from '../Modal-provider.context'
import {handleThemeProviderFocus} from './Theme-provider-handle'
import type {ThemeProps} from './Theme-provider.interface'
import {Container} from './Theme-provider.styles'

const MobileDevice: FC<ThemeProps> = ({designOptions, children, token: themeToken, density = DENSITY.STANDARD}) => {
	const {windowSize, width, height} = useWindowSize()
	const design = {
		[WINDOW_SIZE.COMPACT]: {designWidth: 375, designHeight: 812, designDensity: 3},
		[WINDOW_SIZE.EXPANDED]: {designWidth: 375, designHeight: 812, designDensity: 3},
		[WINDOW_SIZE.EXTRA_LARGE]: {designWidth: 1920, designHeight: 1080, designDensity: 3},
		[WINDOW_SIZE.LARGE]: {designWidth: 1920, designHeight: 1080, designDensity: 3},
		[WINDOW_SIZE.MEDIUM]: {designWidth: 375, designHeight: 812, designDensity: 3}
	}

	const {adaptFontSize, adaptSize} = adaptWindow({screenWidth: width, screenHeight: height})(
		designOptions ?? design[windowSize]
	)()

	const colorScheme = useColorScheme()
	const token =
		themeToken ??
		materialToken()({
			contrast: CONTRAST.STANDARD,
			scheme: (colorScheme?.toUpperCase() as Scheme) ?? SCHEME.LIGHT
		})(PALETTE.FROSTY_ICE)

	return (
		<StyledComponentThemeProvider
			theme={{adaptFontSize, adaptSize, colorScheme, OS: RNPlatform.OS, token, density}}
		>
			{children}
			<ModalProvider />
		</StyledComponentThemeProvider>
	)
}

const DesktopDevice: FC<ThemeProps> = ({children, token: themeToken, density = DENSITY.STANDARD}) => {
	const {adaptFontSize, adaptSize} = adaptWindow()()(true)
	const colorScheme = useColorScheme()
	const token =
		themeToken ??
		materialToken({platform: RNPlatform.OS.toUpperCase() as Platform})({
			contrast: CONTRAST.STANDARD,
			scheme: (colorScheme?.toUpperCase() as Scheme) ?? SCHEME.LIGHT
		})(PALETTE.FROSTY_ICE)

	return (
		<StyledComponentThemeProvider
			theme={{adaptFontSize, adaptSize, colorScheme, OS: RNPlatform.OS, token, density}}
		>
			{children}
			<ModalProvider />
		</StyledComponentThemeProvider>
	)
}

export const ThemeProvider: FC<ThemeProps> = ({story, ...props}) => {
	const ref = useRef<View>(null)
	const onThemeProviderFocus = handleThemeProviderFocus(ref)
	const id = useId()

	return (
		<Container
			enableFocusRing={false}
			onPressIn={onThemeProviderFocus}
			ref={ref}
			story={story}
			testID={`bearei__material--${id}`}
		>
			{['macos', 'windows', 'web'].includes(RNPlatform.OS) ?
				<DesktopDevice {...props} />
			:	<MobileDevice {...props} />}
		</Container>
	)
}
