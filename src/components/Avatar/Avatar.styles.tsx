import styled, {css} from 'styled-components/native'
import {getScaledSpacing} from '../../utils'
import {Shape, Typography} from '../Common'
import {LayoutAnimated} from '../Layout-animated'
import type {AvatarContentProps} from './Avatar.interface'

export const Container = styled(Shape)<AvatarContentProps>`
	pointer-events: none;
	position: relative;

	${({theme, size, density, backgroundColor}) => {
		const densityScale = getScaledSpacing(density)(theme)

		return css`
			background-color: ${backgroundColor ?? theme.token.scheme.primaryContainer};
			height: ${size ?? theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)}px;
			width: ${size ?? theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)}px;
		`
	}};
`

export const Image = styled.Image`
	height: 100%;
	width: 100%;
`

export const LabelText = styled(Typography)`
	${({theme}) => css`
		color: ${theme.token.scheme.onPrimaryContainer};
	`}
`

export const ContentItem = styled(LayoutAnimated)`
	align-items: center;
	display: flex;
	flex-direction: row;
	justify-content: center;
	position: absolute;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		padding: ${theme.adaptSize(theme.token.spacing.small)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`};
`
