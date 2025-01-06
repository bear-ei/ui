import {token as materialToken} from '@bearei/material-token'
import {FC, useId, useRef} from 'react'
import {Platform, useColorScheme, View} from 'react-native'
import {ThemeProvider as StyledComponentThemeProvider} from 'styled-components/native'
import {useWindowSize} from '../../hooks'
import {adaptWindow} from '../../utils'
import {ModalProvider} from '../Modal-provider.context'
import {handleThemeProviderFocus} from './Theme-provider-handle'
import {ThemeProps} from './Theme-provider.interface'
import {Container} from './Theme-provider.styles'

const MobileDevice: FC<ThemeProps> = ({designOptions, children, token: themeToken}) => {
        const {windowSize, width, height} = useWindowSize()
        const design = {
                compact: {designWidth: 375, designHeight: 812, designDensity: 3},
                expanded: {designWidth: 375, designHeight: 812, designDensity: 3},
                extraLarge: {designWidth: 1920, designHeight: 1080, designDensity: 3},
                large: {designWidth: 1920, designHeight: 1080, designDensity: 3},
                medium: {designWidth: 375, designHeight: 812, designDensity: 3}
        }

        const {adaptFontSize, adaptSize} = adaptWindow({screenWidth: width, screenHeight: height})(
                designOptions ?? design[windowSize]
        )()

        const colorScheme = useColorScheme()
        const token = themeToken ?? materialToken()({scheme: colorScheme ?? 'light', contrast: 'standard'})('frostyIce')

        return (
                <StyledComponentThemeProvider theme={{adaptFontSize, adaptSize, colorScheme, OS: Platform.OS, token}}>
                        {children}
                        <ModalProvider />
                </StyledComponentThemeProvider>
        )
}

const DesktopDevice: FC<ThemeProps> = ({children, token: themeToken}) => {
        const {adaptFontSize, adaptSize} = adaptWindow()()(true)
        const colorScheme = useColorScheme()
        const token = themeToken ?? materialToken()({scheme: colorScheme ?? 'light', contrast: 'standard'})('frostyIce')

        return (
                <StyledComponentThemeProvider theme={{adaptFontSize, adaptSize, colorScheme, OS: Platform.OS, token}}>
                        {children}
                        <ModalProvider />
                </StyledComponentThemeProvider>
        )
}

export const ThemeProvider: FC<ThemeProps> = ({story, ...props}) => {
        const id = useId()
        const ref = useRef<View>(null)
        const onThemeProviderFocus = handleThemeProviderFocus(ref)

        return (
                <Container
                        enableFocusRing={false}
                        onPressIn={onThemeProviderFocus}
                        ref={ref}
                        story={story}
                        testID={`bearei__material--${id}`}
                >
                        {['macos', 'windows', 'web'].includes(Platform.OS) ?
                                <DesktopDevice {...props} />
                        :       <MobileDevice {...props} />}
                </Container>
        )
}
