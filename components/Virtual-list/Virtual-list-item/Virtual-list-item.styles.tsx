import {View} from 'react-native'
import styled, {css} from 'styled-components/native'
import {LAYOUT} from '../../Common'
import type {VirtualListItemContainerProps, VirtualListItemDragContentProps} from './Virtual-list-item.interface'

export const Container = styled(View)<VirtualListItemContainerProps>`
	display: flex;
	flex-direction: column;
	position: absolute;

	${({theme, itemSize, layoutType}) =>
		layoutType === LAYOUT.VERTICAL &&
		css`
			height: ${itemSize}px;
			left: ${theme.adaptSize(theme.token.spacing.none)}px;
			right: ${theme.adaptSize(theme.token.spacing.none)}px;
			top: ${theme.adaptSize(theme.token.spacing.none)}px;
		`}

	${({theme, itemSize, layoutType}) =>
		layoutType === LAYOUT.HORIZONTAL &&
		css`
			bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
			left: ${theme.adaptSize(theme.token.spacing.none)}px;
			top: ${theme.adaptSize(theme.token.spacing.none)}px;
			width: ${itemSize}px;
		`}



	${({zIndex = 0}) => css`
		z-index: ${zIndex};
	`}
`

export const DragContent = styled.View<VirtualListItemDragContentProps>`
	${({itemSize = 0, layoutType, gap = 0}) =>
		layoutType === LAYOUT.VERTICAL &&
		css`
			height: ${itemSize - gap}px;
		`}

	${({itemSize = 0, layoutType, gap = 0}) =>
		layoutType === LAYOUT.HORIZONTAL &&
		css`
			width: ${itemSize - gap}px;
		`}
`
