import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../Common'
import {AvatarContainerProps, AvatarContentProps} from './Avatar.interface'

export const Container = styled.View<AvatarContainerProps>`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    ${({theme, densityScale = 0}) => css`
        height: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 10 + densityScale * theme.token.spacing.extraSmall
        )}px;

        min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        width: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 10 + densityScale * theme.token.spacing.extraSmall
        )}px;
    `}
`

export const Content = styled(Shape)<AvatarContentProps>`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${({theme, backgroundColor, densityScale = 0}) => css`
        background-color: ${backgroundColor ?? theme.token.scheme.primaryContainer};
        height: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 10 + densityScale * theme.token.spacing.extraSmall
        )}px;

        width: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 10 + densityScale * theme.token.spacing.extraSmall
        )}px;
    `};
`

export const Image = styled.Image`
    width: 100%;
    height: 100%;
`

export const LabelText = styled(Typography)`
    ${({theme}) => css`
        color: ${theme.token.scheme.onPrimaryContainer};
    `}
`
