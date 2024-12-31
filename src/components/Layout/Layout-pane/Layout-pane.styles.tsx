import styled, {css} from 'styled-components/native'
import {LayoutAnimated, LayoutAnimatedProps} from '../../Layout-animated'
import {LayoutPaneContainerProps} from './Layout-pane.interface'

export const Container = styled(LayoutAnimated)<LayoutPaneContainerProps & LayoutAnimatedProps>`
        align-self: stretch;
        flex: auto;
        overflow: hidden;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.surface};
        `}

        ${({width, flex = 1}) =>
                typeof width !== 'number' &&
                css`
                        flex: ${flex};
                `}
`
