import styled, {css} from 'styled-components/native'
import type {LayoutAnimatedProps} from '../../Layout-animated'
import {LayoutAnimated} from '../../Layout-animated'
import type {VirtualListItemContainerProps} from './Virtual-list-item.interface'

export const ContainerLayout = styled(LayoutAnimated)<VirtualListItemContainerProps & LayoutAnimatedProps>`
	display: flex;
	flex-direction: column;
	position: absolute;

	${({theme, itemSize}) => css`
		height: ${itemSize}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
	`}
`
