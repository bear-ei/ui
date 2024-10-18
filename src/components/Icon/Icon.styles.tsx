import styled, {css} from 'styled-components/native'
import {IconContainerProps} from './Icon.interface'

export const Container = styled.View<IconContainerProps>`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    ${({theme, width, height}) => css`
        height: ${width ?? theme.adaptSize(theme.token.spacing.large)}px;
        width: ${height ?? theme.adaptSize(theme.token.spacing.large)}px;
    `}
`
