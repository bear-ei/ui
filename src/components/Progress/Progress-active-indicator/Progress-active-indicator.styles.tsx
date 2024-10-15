import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'

export const Container = styled(Shape)`
    ${({theme}) => css`
        background-color: ${theme.token.scheme.primary};
        height: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
    `};
`
