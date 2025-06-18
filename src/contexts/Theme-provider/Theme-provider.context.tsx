import type {Platform, Scheme} from '@bearei/element-token'
import {CONTRAST, createToken, PALETTE, PLATFORM, SCHEME, WINDOW_SIZE} from '@bearei/element-token'
import type {FC} from 'react'
import {useMemo} from 'react'
import {Platform as RNPlatform, useColorScheme} from 'react-native'
import {ThemeProvider as StyledComponentThemeProvider} from 'styled-components/native'
import {DENSITY} from '../../components'
import {GlobalStyle} from '../../global.styles.ts'
import {useWindowSize} from '../../hooks'
import {adaptWindow} from '../../utils'
import {ModalProvider} from '../Modal-provider'
import type {ThemeProps} from './Theme-provider.interface'

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

	const platform = PLATFORM[RNPlatform.OS.toUpperCase() as Platform]
	const token = useMemo(
		() =>
			rawThemeToken ??
			createToken({platform})({
				contrast: CONTRAST.STANDARD,
				scheme: (colorScheme?.toUpperCase() as Scheme) ?? SCHEME.LIGHT
			})(PALETTE.FROSTY_ICE),
		[colorScheme, platform, rawThemeToken]
	)

	return (
		<StyledComponentThemeProvider
			theme={{adaptFontSize, adaptSize, colorScheme, density, OS: RNPlatform.OS, token}}
		>
			{RNPlatform.OS === 'web' && <GlobalStyle />}
			{children}
			<ModalProvider />
		</StyledComponentThemeProvider>
	)
}

const DesktopDevice: FC<ThemeProps> = ({children, token: rawThemeToken, density = DENSITY.STANDARD}) => {
	const {adaptFontSize, adaptSize} = useMemo(() => adaptWindow()()(true), [])
	const colorScheme = useColorScheme()
	const platform = PLATFORM[RNPlatform.OS.toUpperCase() as Platform]
	const token = useMemo(
		() =>
			rawThemeToken ??
			createToken({platform})({
				contrast: CONTRAST.STANDARD,
				scheme: (colorScheme?.toUpperCase() as Scheme) ?? SCHEME.LIGHT
			})(PALETTE.FROSTY_ICE),
		[colorScheme, platform, rawThemeToken]
	)

	return (
		<StyledComponentThemeProvider
			theme={{adaptFontSize, adaptSize, colorScheme, density, OS: RNPlatform.OS, token}}
		>
			{RNPlatform.OS === 'web' && <GlobalStyle />}
			{children}
			<ModalProvider />
		</StyledComponentThemeProvider>
	)
}

export const ThemeProvider: FC<ThemeProps> = props =>
	['macos', 'windows', 'web'].includes(RNPlatform.OS) ? <DesktopDevice {...props} /> : <MobileDevice {...props} />
