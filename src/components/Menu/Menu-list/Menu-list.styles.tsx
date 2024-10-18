import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'
import {MenuListContainerProps} from './Menu-list.interface'

export const Container = styled.View<MenuListContainerProps>`
    display: flex;
    flex-direction: column;
    position: relative;

    ${({theme}) => css`
        min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 36)}px;
    `}
`

export const ListContainer = styled(Shape)`
    flex: 1;

    ${({theme}) => css`
        background-color: ${theme.token.scheme.surfaceContainer};
    `}
`
