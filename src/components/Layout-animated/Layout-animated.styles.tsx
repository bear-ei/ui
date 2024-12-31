import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {LayoutAnimatedContainerProps} from './Layout-animated.interface'

export const Container = styled(Shape)<LayoutAnimatedContainerProps>`
        display: flex;
        flex-direction: column;
        overflow: hidden;

        ${({visible, theme, hidden}) =>
                !visible &&
                hidden &&
                css`
                        height: ${theme.token.spacing.none}px;
                `}

        ${({visible}) =>
                !visible &&
                css`
                        z-index: -1024;
                `}
`
