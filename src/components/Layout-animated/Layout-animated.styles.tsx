import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {ContentLayoutProps, LayoutAnimatedContainerProps} from './Layout-animated.interface'

export const Container = styled(Shape)<LayoutAnimatedContainerProps>`
        position: relative;

        ${({visible, theme, collapse}) =>
                !visible &&
                !collapse &&
                css`
                        height: ${theme.adaptSize(theme.token.spacing.none)}px;
                        z-index: -1024;
                `}

        ${({visible}) =>
                !visible &&
                css`
                        overflow: hidden;
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

        ${({contentSize, visible}) =>
                typeof contentSize?.height === 'number' &&
                !visible &&
                css`
                        min-height: ${contentSize.height}px;
                `}
`

export const Content = styled.View`
        display: flex;
        align-self: stretch;
        flex: 1;
`
