import styled, {css} from 'styled-components/native'
import {LayoutAnimated, LayoutAnimatedProps} from '../Layout-animated'

export const ContainerLayout = styled(LayoutAnimated)<LayoutAnimatedProps>`
        align-self: stretch;
        flex: 1;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.surfaceContainer};
        `}
`

export const Content = styled.View`
        display: flex;
        flex-direction: column;
        align-self: stretch;
        flex: 1;
`
