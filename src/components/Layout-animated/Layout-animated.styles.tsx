import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {LayoutAnimatedContentInnerProps, LayoutAnimatedContentProps} from './Layout-animated.interface'

export const Container = styled(Shape)`
        display: flex;
        flex-direction: column;
`

export const Content = styled.View<LayoutAnimatedContentProps>`
        ${({theme, visible, hidden}) =>
                hidden &&
                !visible &&
                css`
                        height: ${theme.token.spacing.none}px;
                        min-height: ${theme.token.spacing.none}px;
                        overflow: hidden;
                        z-index: -1024;
                `}
`

export const ContentInner = styled.View<LayoutAnimatedContentInnerProps>`
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
