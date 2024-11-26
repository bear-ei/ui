import styled, {css} from 'styled-components/native'
import {LayoutAnimated, LayoutAnimatedProps} from '../../Layout-animated'
import {LayoutPaneContainerProps} from './Layout-pane.interface'

export const Container = styled(LayoutAnimated)<LayoutPaneContainerProps & LayoutAnimatedProps>`
        align-self: stretch;
        overflow: hidden;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.surfaceContainerLow};
        `}

        ${({width, flex = 1}) =>
                typeof width !== 'number' &&
                css`
                        flex: ${flex};
                `}
`
