import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'
import {LayoutPaneContainerProps} from './Layout-pane.interface'

export const Container = styled(Shape)<LayoutPaneContainerProps>`
    align-self: stretch;
    flex: 1;

    ${({theme}) => css`
        background-color: ${theme.token.scheme.surfaceContainerLow};
    `}

    ${({width}) =>
        width &&
        css`
            max-width: ${width}px;
            min-width: ${width}px;
            width: ${width}px;
        `}
`
