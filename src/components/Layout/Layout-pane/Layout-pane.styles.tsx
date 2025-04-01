import styled, {css} from 'styled-components/native'
import {LayoutAnimated, LayoutAnimatedProps} from '../../Layout-animated'

export const ContainerLayout = styled(LayoutAnimated)<LayoutAnimatedProps>`
        align-self: stretch;
        display: flex;
        flex-direction: column;
        flex: 1;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.surface};
        `}
`
