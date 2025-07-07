import styled, {css} from 'styled-components/native'
import {LAYOUT} from '../../Common'
import type {LayoutAnimatedProps} from '../../Layout-animated'
import {LayoutAnimated} from '../../Layout-animated'
import type {VirtualListItemContainerProps} from './Virtual-list-item.interface'

export const ContainerLayout = styled(LayoutAnimated)<VirtualListItemContainerProps & LayoutAnimatedProps>`
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
`
