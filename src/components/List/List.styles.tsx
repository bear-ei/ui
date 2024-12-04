import styled, {css} from 'styled-components/native'
import {ListContainerProps} from './List.interface'

export const Container = styled.View<ListContainerProps>`
        align-self: stretch;
        flex: 1;

        ${({theme, type}) => css`
                padding: ${type === 'navigation' ?
                                theme.adaptSize(theme.token.spacing.extraSmall + -0.5 * theme.token.spacing.extraSmall)
                        :       theme.adaptSize(theme.token.spacing.small)}px
                        ${theme.adaptSize(theme.token.spacing.none)}px;
        `};
`
