import styled, {css} from 'styled-components/native'
import {LayoutAnimated} from '../../Layout-animated'
import type {ListItemAfterAffordanceContainerProps} from './List-after-affordance.interface'

export const Container = styled(LayoutAnimated)<ListItemAfterAffordanceContainerProps>`
	align-self: stretch;
	display: flex;
	flex-direction: row;
	position: relative;

	${({theme}) => css`
		width: ${theme.adaptSize(theme.token.spacing.extraSmall * 34)}px;
	`};

	${({theme, disabled}) =>
		!disabled &&
		css`
			background-color: ${theme.token.scheme.primary};
		`};
`

export const Danger = styled(LayoutAnimated)`
	pointer-events: none;
	position: absolute;
	width: 50%;
	z-index: -4;

	${({theme}) => css`
		background-color: ${theme.token.scheme.error};
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`};
`
