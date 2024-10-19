import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'
import {MenuListContainerProps} from './Menu-list.interface'

export const Container = styled.View<MenuListContainerProps>`
    display: flex;
    flex-direction: column;
    position: relative;

    ${({theme, height}) => css`
        min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 36)}px;
        max-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 60)}px;
        height: ${height};
    `}
`

export const ListContainer = styled(Shape)`
    flex: 1;

    ${({theme}) => css`
        background-color: ${theme.token.scheme.surfaceContainer};
    `}
`
