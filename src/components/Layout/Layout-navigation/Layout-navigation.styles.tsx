import styled, {css} from 'styled-components/native'
import {LayoutAnimated, LayoutAnimatedProps} from '../../Layout-animated'

export const Container = styled(LayoutAnimated)<LayoutAnimatedProps>`
        ${({theme}) => css`
                background-color: ${theme.token.scheme.surfaceContainer};
        `}
`

export const Content = styled.View<LayoutAnimatedProps>`
        flex: 1;
        align-self: stretch;

        ${({theme}) => css`
                max-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 100)}px;
                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 20)}px;
        `}
`
