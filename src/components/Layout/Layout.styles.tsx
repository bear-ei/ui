import styled, {css} from 'styled-components/native'
import {LayoutAnimated, LayoutAnimatedProps} from '../Layout-animated'

export const Container = styled(LayoutAnimated)<LayoutAnimatedProps>`
        align-self: stretch;
        display: flex;
        flex-direction: row;
        flex: 1;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.surfaceContainer};
        `}
`
