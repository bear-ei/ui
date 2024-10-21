import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'
import {LayoutPaneContainerProps} from './Layout-pane.interface'

export const Container = styled(Shape)<LayoutPaneContainerProps>`
    align-self: stretch;
    overflow: hidden;

    ${({theme, flex = 1}) => css`
        background-color: ${theme.token.scheme.surfaceContainerLow};
        flex: ${flex};
    `}

    ${({width}) =>
        width &&
        css`
            max-width: ${width}px;
            min-width: ${width}px;
            width: ${width}px;
        `}
`
