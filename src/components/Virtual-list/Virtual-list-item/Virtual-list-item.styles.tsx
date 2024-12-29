import styled from 'styled-components/native'
import {LayoutAnimated, LayoutAnimatedProps} from '../../Layout-animated'
import {VirtualListItemContainerOptions} from './Virtual-list-item.interface'

export const AnimatedContainer = styled(LayoutAnimated)<VirtualListItemContainerOptions & LayoutAnimatedProps>`
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        justify-content: center;
`
