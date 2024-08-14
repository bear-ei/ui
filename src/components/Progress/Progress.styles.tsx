import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {ProgressContainerProps} from './Progress.interface'

export const Container = styled(Shape)<ProgressContainerProps>`
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: hidden;
    position: relative;

    ${({theme}) => css`
        height: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
    `};

    ${({theme, progress}) =>
        progress &&
        css`
            gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
        `};
`

export const Track = styled(Shape)`
    ${({theme}) => css`
        background-color: ${theme.token.scheme.primaryContainer};
        flex: 1;
        height: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
    `};
`

export const Stop = styled(Shape)`
    position: absolute;

    ${({theme}) => css`
        background-color: ${theme.token.scheme.primary};
        height: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
        right: ${theme.adaptSize(theme.token.spacing.none)}px;
        top: ${theme.adaptSize(theme.token.spacing.none)}px;
        width: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
    `};
`
