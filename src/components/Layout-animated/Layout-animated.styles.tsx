import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {LayoutAnimatedContainerProps, LayoutAnimatedContentLayoutProps} from './Layout-animated.interface'

export const Container = styled(Shape)<LayoutAnimatedContainerProps>`
        overflow: hidden;

        ${({visible, theme, hidden}) =>
                !visible &&
                hidden &&
                css`
                        max-height: ${theme.token.spacing.none}px;
                `}

        ${({visible}) =>
                !visible &&
                css`
                        z-index: -1024;
                `}
`

export const ContentLayout = styled.View<LayoutAnimatedContentLayoutProps>`
        flex: 1;
        position: relative;

        ${({layout}) =>
                layout?.height &&
                css`
                        min-height: ${layout.height}px;
                `}
`

export const Content = styled.View`
        position: absolute;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `};
`
