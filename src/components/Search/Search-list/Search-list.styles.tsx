import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'
import {SearchListContainerProps} from './Search-list.interface'

export const Container = styled(Shape)<SearchListContainerProps>`
        overflow: hidden;
        position: absolute;
        z-index: 4096;
        transform-origin: top;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.surfaceContainerHigh};
        `};

        ${({containerHeight = 0, containerPageX = 0, containerPageY = 0, size = 0}) => css`
                left: ${containerPageY}px;
                padding-top: ${containerHeight};
                top: ${containerPageX}px;
                width: ${size}px;
        `};
`
