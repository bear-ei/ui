import styled, {css} from 'styled-components/native'
import {ListAfterAffordanceDangerProps} from './List-after-affordance.interface'

export const Container = styled.View`
        align-self: stretch;
        display: flex;
        flex-direction: row;
        position: relative;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.primary};
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 28)}px;
        `}
`

export const Danger = styled.View<ListAfterAffordanceDangerProps>`
        position: absolute;
        width: 50%;
        z-index: -4;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `};

        ${({theme, disabled}) =>
                !disabled &&
                css`
                        background-color: ${theme.token.scheme.error};
                `};
`
