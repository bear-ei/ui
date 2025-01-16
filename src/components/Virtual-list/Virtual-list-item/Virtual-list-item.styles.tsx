import {css} from 'styled-components'
import styled from 'styled-components/native'
import {LayoutAnimated, LayoutAnimatedProps} from '../../Layout-animated'
import {VirtualListItemContainerProps} from './Virtual-list-item.interface'

export const ContainerLayoutAnimated = styled(LayoutAnimated)<VirtualListItemContainerProps & LayoutAnimatedProps>`
        align-self: stretch;
        display: flex;
        flex-direction: column;
        transform-origin: top;

        ${({itemSize}) => css`
                height: ${itemSize}px;
        `}
`
