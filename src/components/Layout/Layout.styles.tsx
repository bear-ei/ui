import styled, {css} from 'styled-components/native'

export const Container = styled.View`
        align-self: stretch;
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: center;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.surface};
        `}
`
