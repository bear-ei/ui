import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {ActiveLayerProps, HoverLayerProps, UnderlayContainerProps} from './Underlay.interface'

export const Container = styled(Shape)<UnderlayContainerProps>`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        position: absolute;
        z-index: -4;
        overflow: hidden;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}

        ${({height, width}) => css`
                height: ${height ? `${height}px` : 'auto'};
                width: ${width ? `${width}px` : 'auto'};
        `}
`

export const HoverLayer = styled(Shape)<HoverLayerProps>`
        position: absolute;
        z-index: 8;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}

        ${({underlayColor}) =>
                underlayColor &&
                css`
                        background-color: ${underlayColor};
                `}
`

export const ActiveLayer = styled(Shape)<ActiveLayerProps>`
        position: absolute;
        z-index: 4;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}

        ${({activeColor}) =>
                activeColor &&
                css`
                        background-color: ${activeColor};
                `}
`
