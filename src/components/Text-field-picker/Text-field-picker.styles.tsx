import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'

export const Container = styled.View`
    flex: 1;
    position: relative;
`

export const ListContainer = styled(Shape)`
    flex: 1;
    overflow: hidden;
`

export const Item = styled.View`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${({theme}) => css`
        height: ${theme.adaptSize(
            theme.token.spacing.large + -1 * theme.token.spacing.extraSmall
        )}px;

        margin-top: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
    `};
`
