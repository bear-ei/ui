import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {LoadingContainerProps} from './Loading.interface'

export const Container = styled(Shape)<LoadingContainerProps>`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;

        ${({theme, width, height}) => css`
                background-color: ${theme.token.scheme.secondaryContainer};
                height: ${height ?? theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                width: ${width ?? theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        `}
`

export const Content = styled.View`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        z-index: 4;
`

export const Main = styled.View`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;

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
                background-color: ${theme.token.scheme.secondaryContainer};
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}
`
