import styled, {css} from 'styled-components/native'
import {Typography} from '../Common'
import {LayoutAnimated} from '../Layout-animated'

export const Container = styled.View`
        align-self: stretch;
        flex: 1;

        ${({theme}) => css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 40)}px;
        `}
`

export const Content = styled(LayoutAnimated)`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
`

export const EmptyContent = styled(LayoutAnimated)`
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

export const LoadingContent = styled(EmptyContent)``
export const Supporting = styled(Typography)``
