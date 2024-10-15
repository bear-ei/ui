import {token} from '@bearei/material-token'
import {FC, useId} from 'react'
import {Platform, useColorScheme, useWindowDimensions} from 'react-native'
import {ThemeProvider as StyledComponentThemeProvider} from 'styled-components/native'
import {adaptWindow} from '../../utils'
import {ModalProvider} from '../Modal-provider.context'
import {ThemeProps} from './Theme-provider.interface'
import {Container} from './Theme-provider.styles'

const DesktopThemeProvider: FC<ThemeProps> = ({children, token: themeToken}) => {
    const colorScheme = useColorScheme()
    const {adaptFontSize, adaptSize} = adaptWindow()()(true)

    return (
        <StyledComponentThemeProvider
            theme={{
                adaptFontSize,
                adaptSize,
                colorScheme,
                OS: Platform.OS,
                token: themeToken ?? token()(colorScheme ?? 'light')('gemstoneBlue')
            }}
        >
            <ModalProvider />
            {children}
        </StyledComponentThemeProvider>
    )
}

const MobileThemeProvider: FC<ThemeProps> = ({designOptions = {}, children, token: themeToken}) => {
    const colorScheme = useColorScheme()
    const {width, height} = useWindowDimensions()
    const {adaptFontSize, adaptSize} = adaptWindow({screenWidth: width, screenHeight: height})(designOptions)(false)

    return (
        <StyledComponentThemeProvider
            theme={{
                adaptFontSize,
                adaptSize,
                colorScheme,
                OS: Platform.OS,
                token: themeToken ?? token()(colorScheme ?? 'light')('gemstoneBlue')
            }}
        >
            <ModalProvider />
            {children}
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
            :   <MobileThemeProvider {...props} />}
        </Container>
    )
}
