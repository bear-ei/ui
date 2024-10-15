import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'
import {TouchableRippleContainerProps} from './Touchable-ripple.interface'

export const Container = styled(Shape)<TouchableRippleContainerProps>`
    position: absolute;

    ${({height = 0, locationX = 0, locationY = 0, width = 0}) => css`
        height: ${height}px;
        left: ${locationX}px;
        top: ${locationY}px;
        width: ${width}px;
    `}

    ${({underlayColor, theme}) => css`
        background-color: ${theme.token.palette.convertHexToRGBA(underlayColor ?? theme.token.scheme.onSurface)(0.12)};
    `};
`
