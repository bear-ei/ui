import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {LoadingContainerProps} from './Loading.interface'

export const Container = styled.View<LoadingContainerProps>`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;

        ${({theme, width, height}) => css`
                height: ${height ?? theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                width: ${width ?? theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        `}
`

export const Content = styled(Shape)`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 4;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.secondaryContainer};
        `}
`

export const Main = styled.View`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        z-index: 8;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}
`

export const Ripple = styled(Shape)`
        position: absolute;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.secondary};
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}
`
