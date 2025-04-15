import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'

export const Container = styled(Shape)`
	align-self: stretch;
	display: flex;
	flex-direction: row;
	flex: 1;
	overflow: hidden;
	position: relative;

	${({theme}) => css`
		gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
	`};
`

export const Content = styled(Shape)`
	${({theme}) => css`
		background-color: ${theme.token.scheme.primary};
		height: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
		transform-origin: left;
	`};
`

export const Track = styled(Shape)`
	align-self: stretch;
	flex: 1;

	${({theme}) => css`
		background-color: ${theme.token.scheme.primaryContainer};
		height: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
	`}
`

export const Stop = styled(Shape)`
	position: absolute;
	z-index: 4;

	${({theme}) => css`
		background-color: ${theme.token.scheme.primary};
		height: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
		width: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
	`};
`
