import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'

export const Container = styled(Shape)`
        align-self: stretch;
        display: flex;
        flex-direction: row;
        flex: 1;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.surface};
        `}
`
