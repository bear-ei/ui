import styled, {css} from 'styled-components/native'
import {IconContainerProps} from './Icon.interface'

export const Container = styled.View<IconContainerProps>`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    ${({theme, densityScale = 0}) => css`
        height: ${theme.adaptSize(theme.token.spacing.large + densityScale * theme.token.spacing.extraSmall)}px;
        width: ${theme.adaptSize(theme.token.spacing.large + densityScale * theme.token.spacing.extraSmall)}px;
    `}
`
