import styled, {css} from 'styled-components/native'
import {Typography} from '../Common'
import {LayoutAnimated} from '../Layout-animated'

export const Container = styled.View`
        flex: 1;
`

export const ScrollView = styled.ScrollView``
export const Content = styled(LayoutAnimated)`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;

        ${({visible}) =>
                visible &&
                css`
                        flex: 1;
                        align-self: stretch;
                `}
`

export const EmptyContent = styled(LayoutAnimated)`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;

        ${({theme}) => css`
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}
`

export const LoadingContent = styled(EmptyContent)``
export const Supporting = styled(Typography)``
