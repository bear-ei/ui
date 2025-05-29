import styled, {css} from 'styled-components/native'
import {Typography} from '../../Common'
import {LayoutAnimated} from '../../Layout-animated'
import {NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import type {
	NavigationRailItemHeaderProps,
	NavigationRailItemLabelTextProps,
	NavigationRailItemTouchableProps
} from './Navigation-rail-item.interface'

export const Container = styled.View``
export const Touchable = styled.Pressable<NavigationRailItemTouchableProps>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	outline-style: none;

	${({theme}) => css`
		height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
		width: ${theme.adaptSize(theme.token.spacing.extraSmall * 20)}px;
	`}
`

export const Header = styled.View<NavigationRailItemHeaderProps>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	z-index: 4;

	${({theme}) => css`
		height: ${theme.adaptSize(theme.token.spacing.extraLarge)}px;
		width: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
	`};

	${({theme, type}) =>
		type === NAVIGATION_RAIL_TYPE.BLOCK &&
		css`
			height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
		`};
`

export const IconLayoutContainer = styled.View`
	overflow: hidden;

	${({theme}) => css`
		height: ${theme.adaptSize(theme.token.spacing.large)}px;
		width: ${theme.adaptSize(theme.token.spacing.large)}px;
	`}
`

export const LabelLayout = styled(LayoutAnimated)`
	align-self: stretch;
	transform-origin: bottom;
`

export const Label = styled.View`
	align-self: stretch;
	position: relative;

	${({theme}) => css`
		min-height: ${theme.adaptSize(theme.token.spacing.large)}px;
	`}
`

export const LabelText = styled(Typography)<NavigationRailItemLabelTextProps>`
	position: absolute;
	user-select: none;

	${({theme, active}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		font-weight: ${active ? theme.token.font.weight.bold : theme.token.font.weight.medium};
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		text-align: center;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
		margin: ${theme.adaptSize(theme.token.spacing.extraSmall)}px
			${theme.adaptSize(theme.token.spacing.none)}px;
	`}
`
