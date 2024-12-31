import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {
        LayoutAnimatedContainerOptions,
        LayoutAnimatedContentInnerProps,
        LayoutAnimatedContentProps
} from './Layout-animated.interface'

export const Container = styled(Shape)<LayoutAnimatedContainerOptions>`
        align-self: stretch;
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;

        ${({width, height}) => css`
                height: ${height ? `${height}px` : 'auto'};
                max-height: ${height ? `${height}px` : 'auto'};
                max-width: ${width ? `${width}px` : 'auto'};
                width: ${width ? `${width}px` : 'auto'};
        `}

        ${({visible}) =>
                !visible &&
                css`
                        z-index: -1024;
                `}
`

export const Content = styled.View<LayoutAnimatedContentProps>`
        align-self: stretch;

        ${({theme, visible}) =>
                visible ?
                        css`
                                flex: 1;
                        `
                :       css`
                                height: ${theme.token.spacing.none}px;
                                min-height: ${theme.token.spacing.none}px;
                                overflow: hidden;
                        `}
`

export const ContentInner = styled.View<LayoutAnimatedContentInnerProps>`
        align-self: stretch;
        display: flex;
        flex-direction: column;
        flex: 1;
        position: relative;

        ${({visible, containerHeight = 0}) =>
                !visible &&
                css`
                        min-height: ${containerHeight}px;
                `};
`

export const Children = styled.View`
        position: absolute;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `};
`
