import styled, {css} from 'styled-components/native'
import {LayoutAnimatedContentProps} from './Layout-animated.interface'

export const Container = styled.View<LayoutAnimatedContentProps>`
        ${({theme, visible, hidden}) =>
                hidden &&
                (visible ?
                        css`
                                height: auto;
                        `
                :       css`
                                height: ${theme.token.spacing.none}px;
                                min-height: ${theme.token.spacing.none}px;
                                overflow: hidden;
                        `)}
`
