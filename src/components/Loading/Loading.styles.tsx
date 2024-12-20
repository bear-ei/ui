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
                height: ${width}px;
                width: ${height}px;
        `}
`

export const Content = styled.View`
        z-index: 4;
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
