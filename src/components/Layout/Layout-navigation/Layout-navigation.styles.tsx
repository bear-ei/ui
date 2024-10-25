import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'

export const Container = styled(Shape)`
        overflow: hidden;

        ${({theme}) => css`
                max-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 80)}px;
                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 20)}px;
                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 20)}px;
        `}
`
