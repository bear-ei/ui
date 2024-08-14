import styled, {css} from 'styled-components/native'
import {ThemeContainerProps} from './Theme-provider.interface'

export const Container = styled.View<ThemeContainerProps>`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    flex: 1;

    ${({story}) =>
        story &&
        css`
            height: 800px;
        `}
`
