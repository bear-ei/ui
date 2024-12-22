import styled, {css} from 'styled-components/native'
import {LayoutAnimated} from '../Layout-animated'
import {MaskContainerProps, MaskContentProps} from './Mask.interface'

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
                        background-color: ${backgroundColor ??
                        theme.token.palette.convertHexToRGBA(theme.token.scheme.scrim)(theme.token.opacity.level4)};

                        bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                        height: auto;
                        left: ${theme.adaptSize(theme.token.spacing.none)}px;
                        right: ${theme.adaptSize(theme.token.spacing.none)}px;
                        top: ${theme.adaptSize(theme.token.spacing.none)}px;
                        width: auto;
                        z-index: 4096;
                `};
`

export const Content = styled.Pressable<MaskContentProps>`
        flex: 1;
        outline-style: none;
`
