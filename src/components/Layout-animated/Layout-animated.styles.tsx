import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {LayoutAnimatedContainer} from './Layout-animated.interface'

export const Container = styled(Shape)<LayoutAnimatedContainer>`
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
