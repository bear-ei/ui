import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'

export const Container = styled.View`
    flex: 1;
    position: relative;

    ${({theme}) => css`
        background-color: ${theme.token.scheme.surfaceContainer};
    `}
`

export const ListContainer = styled(Shape)`
    flex: 1;
    overflow: hidden;
`
