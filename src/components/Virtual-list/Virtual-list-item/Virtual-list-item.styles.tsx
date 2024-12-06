import styled, {css} from 'styled-components/native'
import {LayoutAnimated, LayoutAnimatedProps} from '../../Layout-animated'
import {VirtualListItemContainerOptions} from './Virtual-list-item.interface'

export const AnimatedContainer = styled(LayoutAnimated)<VirtualListItemContainerOptions & LayoutAnimatedProps>`
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;

        ${({theme}) => css`
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}

        ${({height}) =>
                typeof height === 'number' &&
                css`
                        height: ${height}px;
                `}
`
