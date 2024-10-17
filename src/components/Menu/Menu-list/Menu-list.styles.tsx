import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'
import {MenuType} from '../Menu.interface'
import {MenuListContainerProps} from './Menu-list.interface'

export const Container = styled.View<MenuListContainerProps>`
    display: flex;
    flex-direction: column;

    ${({theme}) => css`
        min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 36)}px;
    `}

    ${({theme, type = 'textFieldPicker'}) => {
        const containerType = {
            textFieldPicker: css`
                margin-top: ${-theme.adaptSize(theme.token.spacing.large)}px;
            `
        } as Record<MenuType, RuleSet<object> | undefined>

        return containerType[type]
    }}
`

export const ListContainer = styled(Shape)`
    flex: 1;

    ${({theme}) => css`
        background-color: ${theme.token.scheme.surfaceContainer};
    `}
`
