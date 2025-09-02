import styled, {css} from 'styled-components/native'
import {LayoutAnimated, type LayoutAnimatedProps} from '../../Layout-animated'

export const Container = styled(LayoutAnimated)<LayoutAnimatedProps>`
	align-self: stretch;
	display: flex;
	flex-direction: row;
	position: relative;

	${({theme}) => css`
		min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
		width: ${theme.adaptSize(theme.token.spacing.extraSmall * 34)}px;
	`};
`

export const Danger = styled.View`
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
