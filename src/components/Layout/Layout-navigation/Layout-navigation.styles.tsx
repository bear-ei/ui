import styled, {css} from 'styled-components/native'
import {LayoutAnimated, LayoutAnimatedProps} from '../../Layout-animated'

export const Container = styled(LayoutAnimated)<LayoutAnimatedProps>`
        overflow: hidden;

        ${({theme}) => css`
                max-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 80)}px;
        `}
`
