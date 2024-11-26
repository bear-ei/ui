import styled, {css} from 'styled-components/native'

export const Container = styled.View`
        align-self: stretch;
        display: flex;
        flex-direction: row;
        flex: 1;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.surface};
        `}
`
