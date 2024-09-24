import {Elevation} from '@bearei/material-token'
import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {ElevationShadowProps} from './Elevation.interface'

export const Container = styled.View`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    z-index: -2;

    ${({theme}) => css`
        bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
        left: ${theme.adaptSize(theme.token.spacing.none)}px;
        right: ${theme.adaptSize(theme.token.spacing.none)}px;
        top: ${theme.adaptSize(theme.token.spacing.none)}px;
    `};
`

export const Shadow = styled(Shape)<ElevationShadowProps>`
    align-self: stretch;
    flex: 1;

    ${({theme, level = 0}) => {
        const levelString: keyof Elevation = level === 0 ? `level${1}` : `level${level}`

        return css`
            background-color: ${theme.token.scheme.surfaceContainerLow};
            elevation: ${theme.token.elevation[levelString].elevation};
            shadow-color: ${theme.token.elevation.shadowColor};
            shadow-offset: ${theme.adaptSize(theme.token.elevation[levelString].shadowOffset.width)}px
                ${theme.adaptSize(theme.token.elevation[levelString].shadowOffset.height)}px;

            shadow-radius: ${theme.adaptSize(theme.token.elevation[levelString].shadowRadius)}px;
            shadow-opacity: 1;
        `
    }};
`
