import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'

export const Container = styled.View`
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-around;
`

export const Line = styled(Shape)`
    flex: 1;

    ${({theme}) => css`
        background-color: ${theme.token.scheme.outlineVariant};
        height: ${theme.adaptSize(1)}px;
    `}
`

export const ItemContainer = styled.View`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex: 1;
`
