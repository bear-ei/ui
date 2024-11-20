import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../Common'
import {AvatarContentProps} from './Avatar.interface'

export const Container = styled(Shape)`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
        `}
`

export const Content = styled.View<AvatarContentProps>`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;

        ${({theme, backgroundColor}) => css`
                background-color: ${backgroundColor ?? theme.token.scheme.primaryContainer};
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
        `};
`

export const Image = styled.Image`
        height: 100%;
        width: 100%;
`

export const LabelText = styled(Typography)`
        ${({theme}) => css`
                color: ${theme.token.scheme.onPrimaryContainer};
        `}
`
