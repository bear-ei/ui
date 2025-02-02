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

export const Content = styled.View`
        position: relative;
        flex: 1;
`

export const ContentLayoutAnimated = styled(LayoutAnimated)`
        flex: 1;
`

export const EmptyContentLayoutAnimated = styled(LayoutAnimated)`
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

export const LoadingContentLayoutAnimated = styled(EmptyContentLayoutAnimated)``
export const Supporting = styled(Typography)``
