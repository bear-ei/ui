import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../Common'
import {AvatarContainerProps} from './Avatar.interface'

export const Container = styled(Shape)<AvatarContainerProps>`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;

        ${({theme, backgroundColor, size}) => css`
                background-color: ${backgroundColor ?? theme.token.scheme.primaryContainer};
                height: ${size ?? theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
                width: ${size ?? theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
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
