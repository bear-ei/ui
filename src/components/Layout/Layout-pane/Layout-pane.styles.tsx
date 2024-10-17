import styled, {css} from 'styled-components/native'
import {ContainerProps} from './Layout-pane.interface'

export const Container = styled.View<ContainerProps>`
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
