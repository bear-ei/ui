import styled, {css} from 'styled-components/native'
import {Typography} from '../../Common'
import {NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import type {
	NavigationRailItemHeaderProps,
	NavigationRailItemLabelTextProps,
	NavigationRailItemTouchableProps
} from './Navigation-rail-item.interface'

export const Container = styled.View`
	overflow: hidden;
`

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

export const Content = styled.View``
export const Header = styled.View<NavigationRailItemHeaderProps>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	pointer-events: none;
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

export const IconLayout = styled.View`
	overflow: hidden;

	${({theme}) => css`
		height: ${theme.adaptSize(theme.token.spacing.large)}px;
		width: ${theme.adaptSize(theme.token.spacing.large)}px;
	`}
`

export const Label = styled.View`
	align-self: stretch;
	display: flex;
	flex-direction: column;
	justify-content: center;

	${({theme}) => css`
		height: ${theme.adaptSize(theme.token.spacing.large)}px;
	`}
`

export const LabelText = styled(Typography)<NavigationRailItemLabelTextProps>`
	user-select: none;

	${({theme, active}) => css`
		font-weight: ${active ? theme.token.font.weight.bold : theme.token.font.weight.medium};
		text-align: center;
	`}
`
