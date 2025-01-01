import styled from 'styled-components/native'
import {LayoutAnimated, LayoutAnimatedProps} from '../../Layout-animated'
import {VirtualListItemContainerOptions} from './Virtual-list-item.interface'

export const AnimatedContainer = styled(LayoutAnimated)<VirtualListItemContainerOptions & LayoutAnimatedProps>`
        align-self: stretch;
        display: flex;
        flex-direction: column;
        transform-origin: top;
`
