import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {LayoutAnimatedContainerProps, LayoutAnimatedContentLayoutProps} from './Layout-animated.interface'

export const Container = styled(Shape)<LayoutAnimatedContainerProps>`
        position: relative;

        ${({visible, theme, hidden}) =>
                !visible &&
                hidden &&
                css`
                        height: ${theme.token.spacing.none}px;
                `}

        ${({collapse}) =>
                collapse &&
                css`
                        overflow: hidden;
                `}


        ${({visible}) =>
                !visible &&
                css`
                        z-index: -1024;
                `}
`

export const ContentLayout = styled.View<LayoutAnimatedContentLayoutProps>`
        position: absolute;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `};

        ${({layout}) =>
                typeof layout?.height === 'number' &&
                css`
                        min-height: ${layout?.height}px;
                `}

        ${({layout}) =>
                typeof layout?.width === 'number' &&
                css`
                        min-width: ${layout?.width}px;
                `}
`

export const Content = styled.View`
        align-self: stretch;
        flex: 1;
`
