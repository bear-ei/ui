import styled, {css} from 'styled-components/native'
import {getScaledSpacing} from '../../utils'
import {Shape, Typography} from '../Common'
import type {AvatarContainerProps, AvatarContentProps} from './Avatar.interface'

export const Container = styled(Shape)<AvatarContainerProps>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	pointer-events: none;

	${({theme, density}) => {
		const densityScale = getScaledSpacing(density)(theme)

		return css`
			height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)}px;
			width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)}px;
		`
	}}
`

export const Content = styled(Shape)<AvatarContentProps>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;

	${({theme, size, density, backgroundColor}) => {
		const densityScale = getScaledSpacing(density)(theme)

		return css`
			background-color: ${backgroundColor ?? theme.token.scheme.primaryContainer};
			height: ${size ?? theme.adaptSize(theme.token.spacing.extraSmall * 10 + densityScale)}px;
			width: ${size ?? theme.adaptSize(theme.token.spacing.extraSmall * 10 + densityScale)}px;
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
