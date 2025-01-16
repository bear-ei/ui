import styled, {css} from 'styled-components/native'
import {IconContainerProps} from './Icon.interface'

export const Container = styled.View<IconContainerProps>`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;

        ${({theme, size}) => css`
                height: ${size ?? theme.adaptSize(theme.token.spacing.large)}px;
                width: ${size ?? theme.adaptSize(theme.token.spacing.large)}px;
        `}
`
