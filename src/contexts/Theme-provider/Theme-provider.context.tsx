import type {Platform, Scheme} from '@bearei/material-token'
import {CONTRAST, createToken, PALETTE, SCHEME, WINDOW_SIZE} from '@bearei/material-token'
import type {FC} from 'react'
import {useId, useMemo, useRef} from 'react'
import {Platform as RNPlatform, useColorScheme, View} from 'react-native'
import {ThemeProvider as StyledComponentThemeProvider} from 'styled-components/native'
import {DENSITY} from '../../components'
import {useWindowSize} from '../../hooks'
import {adaptWindow, createHandler} from '../../utils'
import {ModalProvider} from '../Modal-provider'
import {handleThemeProviderFocus} from './Theme-provider-handle'
import type {ThemeProps} from './Theme-provider.interface'
import {Container} from './Theme-provider.styles'

const MobileDevice: FC<ThemeProps> = ({designOptions, children, token: rawThemeToken, density = DENSITY.STANDARD}) => {
	const {windowSize, width, height} = useWindowSize()
	const colorScheme = useColorScheme()
	const defaultDesignOptions = useMemo(
		() => ({
			[WINDOW_SIZE.COMPACT]: {designWidth: 375, designHeight: 812, designDensity: 3},
			[WINDOW_SIZE.EXPANDED]: {designWidth: 375, designHeight: 812, designDensity: 3},
			[WINDOW_SIZE.EXTRA_LARGE]: {designWidth: 1920, designHeight: 1080, designDensity: 3},
			[WINDOW_SIZE.LARGE]: {designWidth: 1920, designHeight: 1080, designDensity: 3},
			[WINDOW_SIZE.MEDIUM]: {designWidth: 375, designHeight: 812, designDensity: 3}
		}),
		[]
	)

	const {adaptFontSize, adaptSize} = useMemo(
		() =>
			adaptWindow({screenWidth: width, screenHeight: height})(
				designOptions ?? defaultDesignOptions[windowSize]
			)(),
		[defaultDesignOptions, designOptions, height, width, windowSize]
	)

	const themeToken = useMemo(
		() =>
			rawThemeToken ??
			createToken()({
				contrast: CONTRAST.STANDARD,
				scheme: (colorScheme?.toUpperCase() as Scheme) ?? SCHEME.LIGHT
			})(PALETTE.FROSTY_ICE),
		[colorScheme, rawThemeToken]
	)

	return (
		<StyledComponentThemeProvider
			theme={{adaptFontSize, adaptSize, colorScheme, density, OS: RNPlatform.OS, token: themeToken}}
		>
			{children}
			<ModalProvider />
		</StyledComponentThemeProvider>
	)
}

const DesktopDevice: FC<ThemeProps> = ({children, token: rawThemeToken, density = DENSITY.STANDARD}) => {
	const {adaptFontSize, adaptSize} = useMemo(() => adaptWindow()()(true), [])
	const colorScheme = useColorScheme()
	const themeToken = useMemo(
		() =>
			rawThemeToken ??
			createToken({platform: RNPlatform.OS.toUpperCase() as Platform})({
				contrast: CONTRAST.STANDARD,
				scheme: (colorScheme?.toUpperCase() as Scheme) ?? SCHEME.LIGHT
			})(PALETTE.FROSTY_ICE),
		[colorScheme, rawThemeToken]
	)

	return (
		<StyledComponentThemeProvider
			theme={{adaptFontSize, adaptSize, colorScheme, density, OS: RNPlatform.OS, token: themeToken}}
		>
			{children}
			<ModalProvider />
		</StyledComponentThemeProvider>
	)
}

export const ThemeProvider: FC<ThemeProps> = ({story, ...props}) => {
	const themeProviderRef = useRef<View>(null)
	const onThemeProviderFocus = useMemo(() => createHandler(handleThemeProviderFocus(themeProviderRef))(), [])
	const id = useId()

	return (
		<Container
			enableFocusRing={false}
			onPressIn={onThemeProviderFocus}
			ref={themeProviderRef}
			story={story}
			testID={`bearei__material--${id}`}
		>
			{['macos', 'windows', 'web'].includes(RNPlatform.OS) ?
				<DesktopDevice {...props} />
			:	<MobileDevice {...props} />}
		</Container>
	)
}
