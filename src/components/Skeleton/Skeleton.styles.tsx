import styled, {css} from 'styled-components/native'
import {LAYOUT} from '../Common'
import {LayoutAnimated} from '../Layout-animated'
import type {SkeletonContainerProps} from './Skeleton.interface'

export const SkeletonContainer = styled.View<SkeletonContainerProps>`
	display: flex;
	flex: 1;

	${({theme}) => css`
		min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
		min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
	`}

	${({layoutType = LAYOUT.HORIZONTAL}) =>
		layoutType === LAYOUT.HORIZONTAL ?
			css`
				align-items: center;
				flex-direction: row;
			`
		:	css`
				flex-direction: column;
				justify-content: center;
			`}
`

export const ContentItemLayout = styled(LayoutAnimated)`
	position: absolute;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`}
`

export const Content = styled.View``
