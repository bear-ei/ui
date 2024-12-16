import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {LayoutAnimatedContentProps} from './Layout-animated.interface'

export const Container = styled(Shape)<LayoutAnimatedContentProps>`
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
                                z-index: -1024;
                        `)}
`
