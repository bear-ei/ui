import {Contrast, token as materialToken, PaletteType, Platform, Scheme, WindowSize} from '@bearei/material-token'
import {FC, useId, useRef} from 'react'
import {Platform as RNPlatform, useColorScheme, View} from 'react-native'
import {ThemeProvider as StyledComponentThemeProvider} from 'styled-components/native'
import {useWindowSize} from '../../hooks'
import {adaptWindow} from '../../utils'
import {ModalProvider} from '../Modal-provider.context'
import {handleThemeProviderFocus} from './Theme-provider-handle'
import {ThemeProps} from './Theme-provider.interface'
import {Container} from './Theme-provider.styles'

const MobileDevice: FC<ThemeProps> = ({designOptions, children, token: themeToken, densityScale = 0}) => {
        const {windowSize, width, height} = useWindowSize()
        const design = {
                [WindowSize.COMPACT]: {designWidth: 375, designHeight: 812, designDensity: 3},
                [WindowSize.EXPANDED]: {designWidth: 375, designHeight: 812, designDensity: 3},
                [WindowSize.EXTRA_LARGE]: {designWidth: 1920, designHeight: 1080, designDensity: 3},
                [WindowSize.LARGE]: {designWidth: 1920, designHeight: 1080, designDensity: 3},
                [WindowSize.MEDIUM]: {designWidth: 375, designHeight: 812, designDensity: 3}
        }

        const {adaptFontSize, adaptSize} = adaptWindow({screenWidth: width, screenHeight: height})(
                designOptions ?? design[windowSize]
        )()

        const colorScheme = useColorScheme()
        const token =
                themeToken ??
                materialToken()({
                        contrast: Contrast.STANDARD,
                        scheme: (colorScheme?.toUpperCase() as Scheme) ?? Scheme.LIGHT
                })(PaletteType.FROSTY_ICE)

        return (
                <StyledComponentThemeProvider
                        theme={{adaptFontSize, adaptSize, colorScheme, OS: RNPlatform.OS, token, densityScale}}
                >
                        {children}
                        <ModalProvider />
                </StyledComponentThemeProvider>
        )
}

const DesktopDevice: FC<ThemeProps> = ({children, token: themeToken, densityScale = 0}) => {
        const {adaptFontSize, adaptSize} = adaptWindow()()(true)
        const colorScheme = useColorScheme()
        const token =
                themeToken ??
                materialToken({platform: RNPlatform.OS.toUpperCase() as Platform})({
                        contrast: Contrast.STANDARD,
                        scheme: (colorScheme?.toUpperCase() as Scheme) ?? Scheme.LIGHT
                })(PaletteType.FROSTY_ICE)

        return (
                <StyledComponentThemeProvider
                        theme={{adaptFontSize, adaptSize, colorScheme, OS: RNPlatform.OS, token, densityScale}}
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
                        :       <MobileDevice {...props} />}
                </Container>
        )
}
