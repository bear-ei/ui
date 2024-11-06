import styled, {css} from 'styled-components/native'

export const Container = styled.View`
        display: flex;
        flex-direction: column;

        ${({theme}) => css`
                gap: ${theme.adaptSize(theme.token.spacing.medium)}px;
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        `}
`
