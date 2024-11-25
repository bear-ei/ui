import styled, {css} from 'styled-components/native'
import {LayoutAnimated} from '../Layout-animated'
import {MaskContainerProps} from './Mask.interface'

export const Container = styled(LayoutAnimated)<MaskContainerProps>`
        cursor: default;
        position: absolute;
        z-index: -4096;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.none)}px;
                width: ${theme.adaptSize(theme.token.spacing.none)}px;
        `};

        ${({visible, theme, backgroundColor}) =>
                visible &&
                css`
                        background-color: ${backgroundColor ?? theme.token.scheme.surface};
                        bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                        height: auto;
                        left: ${theme.adaptSize(theme.token.spacing.none)}px;
                        opacity: 0.32;
                        right: ${theme.adaptSize(theme.token.spacing.none)}px;
                        top: ${theme.adaptSize(theme.token.spacing.none)}px;
                        width: auto;
                        z-index: 4096;
                `};
`

export const Content = styled.Pressable`
        flex: 1;
`
