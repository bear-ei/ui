import styled, {css} from 'styled-components/native'
import {LayoutAnimated, LayoutAnimatedProps} from '../../Layout-animated'
import {VirtualListItemContainerProps} from './Virtual-list-item.interface'

export const ContainerLayoutAnimated = styled(LayoutAnimated)<VirtualListItemContainerProps & LayoutAnimatedProps>`
        display: flex;
        flex-direction: column;
        position: absolute;

        ${({theme, itemSize}) => css`
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${itemSize}px;
        `}
`
