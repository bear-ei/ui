import {token as materialToken} from '@bearei/material-token'
import {FC, useId} from 'react'
import {Platform, useColorScheme} from 'react-native'
import {ThemeProvider as StyledComponentThemeProvider} from 'styled-components/native'
import {useWindowDimensions, useWindowSize} from '../../hooks'
import {adaptWindow} from '../../utils'
import {ModalProvider} from '../Modal-provider.context'
import {ThemeProps} from './Theme-provider.interface'
import {Container} from './Theme-provider.styles'

const DesktopThemeProvider: FC<ThemeProps> = ({children, token: themeToken}) => {
        const {adaptFontSize, adaptSize} = adaptWindow()()(true)
        const colorScheme = useColorScheme()
        const windowSize = useWindowSize()
        const token = themeToken ?? materialToken()({scheme: colorScheme ?? 'light', contrast: 'standard'})('frostyIce')

        return (
                <StyledComponentThemeProvider
                        theme={{adaptFontSize, adaptSize, colorScheme, OS: Platform.OS, token, windowSize}}
                >
                        {children}
                        <ModalProvider />
                </StyledComponentThemeProvider>
        )
}

const MobileThemeProvider: FC<ThemeProps> = ({designOptions = {}, children, token: themeToken}) => {
        const {width, height} = useWindowDimensions()
        const {adaptFontSize, adaptSize} = adaptWindow({screenWidth: width, screenHeight: height})(designOptions)(false)
        const colorScheme = useColorScheme()
        const windowSize = useWindowSize()
        const token = themeToken ?? materialToken()({scheme: colorScheme ?? 'light', contrast: 'standard'})('frostyIce')

        return (
                <StyledComponentThemeProvider
                        theme={{adaptFontSize, adaptSize, colorScheme, OS: Platform.OS, token, windowSize}}
                >
                        {children}
                        <ModalProvider />
                </StyledComponentThemeProvider>
        )
}

export const ThemeProvider: FC<ThemeProps> = ({story, ...props}) => {
        const id = useId()
        const desktop = ['web', 'windows', 'macos'].includes(Platform.OS)

        return (
                <Container
                        testID={`bearei__element--${id}`}
                        story={story}
                >
                        {desktop ?
                                <DesktopThemeProvider {...props} />
                        :       <MobileThemeProvider {...props} />}
                </Container>
        )
}
