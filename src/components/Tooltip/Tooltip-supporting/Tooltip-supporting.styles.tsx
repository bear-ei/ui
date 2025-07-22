import {View} from 'react-native'
import type {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../../Common'
import {TOOLTIP_TYPE} from '../Tooltip.enum'
import type {TooltipType} from '../Tooltip.interface'
import {SUPPORTING_POSITION} from './Tooltip-supporting.enum'
import type {
	SupportingPosition,
	TooltipSupportingContentProps,
	TooltipSupportingMainProps
} from './Tooltip-supporting.interface'

export const Container = styled(View)<TooltipSupportingContentProps>`
	${({width = 0}) => css`
		width: ${width}px;
	`}

	${({closed, theme}) =>
		closed &&
		css`
			height: ${theme.adaptSize(theme.token.spacing.none)}px;
			overflow: hidden;
		`}

    ${({
		containerHeight = 0,
		containerPageX = 0,
		containerPageY = 0,
		containerWidth = 0,
		height = 0,
		supportingPosition: position = SUPPORTING_POSITION.VERTICAL_START,
		theme,
		type = TOOLTIP_TYPE.PLAIN,
		width = 0
	}) => {
		const supportingPosition = {
			[TOOLTIP_TYPE.PLAIN]: {
				[SUPPORTING_POSITION.VERTICAL_START]: css`
					left: ${containerPageX + containerWidth / 2}px;
					top: ${containerPageY -
					height -
					theme.adaptSize(theme.token.spacing.extraSmall)}px;
				`,
				[SUPPORTING_POSITION.VERTICAL_END]: css`
					left: ${containerPageX + containerWidth / 2}px;
					top: ${containerPageY +
					containerHeight +
					theme.adaptSize(theme.token.spacing.extraSmall)}px;
				`,
				[SUPPORTING_POSITION.HORIZONTAL_START]: css`
					left: ${containerPageX -
					width -
					theme.adaptSize(theme.token.spacing.extraSmall)}px;
					top: ${containerPageY + containerHeight / 2}px;
				`,
				[SUPPORTING_POSITION.HORIZONTAL_END]: css`
					left: ${containerPageX +
					containerWidth +
					theme.adaptSize(theme.token.spacing.extraSmall)}px;
					top: ${containerPageY + containerHeight / 2}px;
				`
			},
			[TOOLTIP_TYPE.MENU]: {
				[SUPPORTING_POSITION.VERTICAL_START]: css``,
				[SUPPORTING_POSITION.VERTICAL_END]: css`
					left: ${containerPageX}px;
					top: ${containerPageY +
					containerHeight +
					theme.adaptSize(theme.token.spacing.extraSmall)}px;
				`,
				[SUPPORTING_POSITION.HORIZONTAL_START]: css``,
				[SUPPORTING_POSITION.HORIZONTAL_END]: css``
			}
		} as Record<TooltipType, Record<SupportingPosition, RuleSet<object> | undefined>>

		return supportingPosition[type]?.[position]
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
`

export const TouchableContent = styled.Pressable`
	flex: 1;
	align-self: stretch;
	outline-style: none;
`

export const Content = styled.View`
	flex: 1;
	align-self: stretch;
`

export const Main = styled(Shape)<TooltipSupportingMainProps>`
	overflow: hidden;
	position: absolute;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
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

    ${({supportingPosition: position = SUPPORTING_POSITION.VERTICAL_START}) => {
		const supportingPosition = {
			[SUPPORTING_POSITION.VERTICAL_START]: css`
				transform-origin: bottom;
			`,
			[SUPPORTING_POSITION.VERTICAL_END]: css`
				transform-origin: top;
			`,
			[SUPPORTING_POSITION.HORIZONTAL_START]: css`
				transform-origin: right;
			`,
			[SUPPORTING_POSITION.HORIZONTAL_END]: css`
				transform-origin: left;
			`
		}

		return supportingPosition[position]
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
