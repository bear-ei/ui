import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'

export const Container = styled.View`
        align-self: stretch;
        flex: 1;
        position: relative;
`

export const IconContainer = styled(Shape)`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 4;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.secondaryContainer};
        `}
`

export const Content = styled.View`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        z-index: 8;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}
`
