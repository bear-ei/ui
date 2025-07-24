import {View} from 'react-native'
import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../../Common'
import {TOOLTIP_TYPE} from '../Tooltip.enum'
import {SUPPORTING_POSITION} from './Tooltip-supporting.enum'
import type {TooltipSupportingContentProps, TooltipSupportingMainProps} from './Tooltip-supporting.interface'

export const Container = styled(View)<TooltipSupportingContentProps>`
	${({width = 0, height = 0, theme}) => css`
		height: ${height}px;
		min-height: ${theme.adaptSize(theme.token.spacing.large)}px;
		width: ${width}px;
		z-index: 16384;
	`}

	${({
		containerLayout,
		height = 0,
		supportingPosition: position = SUPPORTING_POSITION.VERTICAL_START,
		theme,
		type = TOOLTIP_TYPE.PLAIN,
		width = 0,
		menuPosition
	}) => {
		const {
			height: containerHeight = 0,
			pageX: containerPageX = 0,
			pageY: containerPageY = 0,
			width: containerWidth = 0
		} = containerLayout ?? {}

		const supportingPosition = {
			[SUPPORTING_POSITION.VERTICAL_START]: css`
				left: ${containerPageX - (width - containerWidth) / 2}px;
				top: ${containerPageY - height - theme.adaptSize(theme.token.spacing.extraSmall)}px;
				transform-origin: bottom;
			`,
			[SUPPORTING_POSITION.VERTICAL_END]: css`
				left: ${containerPageX - (width - containerWidth) / 2}px;
				top: ${containerPageY +
				containerHeight +
				theme.adaptSize(theme.token.spacing.extraSmall)}px;

				transform-origin: top;
			`,
			[SUPPORTING_POSITION.HORIZONTAL_START]: css`
				left: ${containerPageX - width - theme.adaptSize(theme.token.spacing.extraSmall)}px;
				top: ${containerPageY - (height - containerHeight) / 2}px;
				transform-origin: right;
			`,
			[SUPPORTING_POSITION.HORIZONTAL_END]: css`
				left: ${containerPageX +
				containerWidth +
				theme.adaptSize(theme.token.spacing.extraSmall)}px;

				top: ${containerPageY - (height - containerHeight) / 2}px;
				transform-origin: left;
			`
		}

		return type === TOOLTIP_TYPE.PLAIN ?
				supportingPosition[position]
			:	css`
					left: ${menuPosition.left ?? 0}px;
					top: ${menuPosition.top ?? 0}px;
				`
	}}
    
    ${({theme}) => {
		const containerOS = {
			ios: css`
				position: absolute;
			`,
			web: css`
				position: fixed;
			`,
			macos: css`
				position: absolute;
			`,
			android: css`
				position: absolute;
			`,
			windows: css`
				position: absolute;
			`
		}

		return containerOS[theme.OS]
	}}


   ${({visible}) =>
		!visible &&
		css`
			z-index: -16384;
		`}
`

export const TouchableContent = styled.Pressable`
	align-self: stretch;
	flex: 1;
	outline-style: none;
	position: relative;
`

export const Content = styled.View`
	align-self: stretch;
	flex: 1;
	position: relative;
`

export const Main = styled(Shape)<TooltipSupportingMainProps>`
	position: absolute;
	overflow: hidden;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`}

	${({theme, type = TOOLTIP_TYPE.PLAIN}) => {
		const contentType = {
			[TOOLTIP_TYPE.PLAIN]: css`
				background-color: ${theme.token.scheme.inverseSurface};
				min-height: ${theme.adaptSize(theme.token.spacing.large)}px;
				padding: ${theme.adaptSize(theme.token.spacing.extraSmall)}px
					${theme.adaptSize(theme.token.spacing.small)}px;
			`,
			[TOOLTIP_TYPE.MENU]: css``,
			[TOOLTIP_TYPE.RICH]: css``
		}

		return contentType[type]
	}}
`

export const Supporting = styled.View``
export const TooltipSupportingText = styled(Typography)`
	text-align: center;
	user-select: none;

	${({theme}) => css`
		color: ${theme.token.scheme.inverseOnSurface};
	`}
`
