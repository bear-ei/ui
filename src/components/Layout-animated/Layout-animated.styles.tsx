import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {ContentLayoutProps, LayoutAnimatedContainerProps} from './Layout-animated.interface'

export const Container = styled(Shape)<LayoutAnimatedContainerProps>`
        position: relative;

        ${({collapse}) =>
                collapse &&
                css`
                        overflow: hidden;
                `}

        ${({visible, theme, collapse}) =>
                !visible &&
                !collapse &&
                css`
                        height: ${theme.adaptSize(theme.token.spacing.none)}px;
                        z-index: -1024;
                `}
`

export const ContentLayout = styled.View<ContentLayoutProps>`
        position: absolute;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `};

        ${({contentSize}) =>
                contentSize?.width &&
                css`
                        min-width: ${contentSize.width}px;
                `}

        ${({contentSize}) =>
                contentSize?.height &&
                css`
                        min-height: ${contentSize.height}px;
                `}
`

export const Content = styled.View`
        align-self: stretch;
        flex: 1;
`
