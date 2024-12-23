import styled, {css} from 'styled-components/native'
import {LayoutAnimated} from '../Layout-animated'
import {MaskContainerProps, MaskContentProps} from './Mask.interface'

export const Container = styled(LayoutAnimated)<MaskContainerProps>`
        cursor: default;
        position: absolute;

        ${({theme, backgroundColor}) => css`
                background-color: ${theme.token.palette.convertHexToRGBA(backgroundColor ?? theme.token.scheme.scrim)(
                        theme.token.opacity.level4
                )};

                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                height: auto;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
                width: auto;
                z-index: 4096;
        `};

        ${({visible, theme}) =>
                !visible &&
                css`
                        z-index: -4096;
                        height: ${theme.adaptSize(theme.token.spacing.none)}px;
                        width: ${theme.adaptSize(theme.token.spacing.none)}px;
                `};
`

export const Content = styled.Pressable<MaskContentProps>`
        flex: 1;
        outline-style: none;
`
