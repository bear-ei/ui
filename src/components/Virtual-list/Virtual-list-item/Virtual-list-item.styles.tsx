import styled, {css} from 'styled-components/native'
import {LAYOUT} from '../../Common'
import type {LayoutAnimatedProps} from '../../Layout-animated'
import {LayoutAnimated} from '../../Layout-animated'
import type {VirtualListItemContainerProps, VirtualListItemDragContentProps} from './Virtual-list-item.interface'

export const Container = styled(LayoutAnimated)<VirtualListItemContainerProps & LayoutAnimatedProps>`
	display: flex;
	flex-direction: column;
	position: absolute;

	${({theme, itemSize, layout}) =>
		layout === LAYOUT.VERTICAL &&
		css`
			height: ${itemSize}px;
			left: ${theme.adaptSize(theme.token.spacing.none)}px;
			right: ${theme.adaptSize(theme.token.spacing.none)}px;
			top: ${theme.adaptSize(theme.token.spacing.none)}px;
		`}

	${({theme, itemSize, layout}) =>
		layout === LAYOUT.HORIZONTAL &&
		css`
			bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
			left: ${theme.adaptSize(theme.token.spacing.none)}px;
			top: ${theme.adaptSize(theme.token.spacing.none)}px;
			width: ${itemSize}px;
		`}



	${({dragging}) =>
		dragging &&
		css`
			z-index: 1024;
		`}
`

export const DragContent = styled.View<VirtualListItemDragContentProps>`
	${({itemSize = 0, layout, gap = 0}) =>
		layout === LAYOUT.VERTICAL &&
		css`
			height: ${itemSize - gap}px;
		`}

	${({itemSize = 0, layout, gap = 0}) =>
		layout === LAYOUT.HORIZONTAL &&
		css`
			width: ${itemSize - gap}px;
		`}
`
