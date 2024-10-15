import styled, {css} from 'styled-components/native'

export const Container = styled.View`
    position: absolute;

    ${({theme}) => css`
        left: ${theme.adaptSize(theme.token.spacing.none)}px;
        right: ${theme.adaptSize(theme.token.spacing.none)}px;
    `}
`
