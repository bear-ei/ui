import styled, {css} from 'styled-components/native'
import {DENSITY_SCALE, Shape, Typography} from '../Common'
import type {AvatarContainerProps, AvatarContentProps} from './Avatar.interface'

export const Container = styled(Shape)<AvatarContainerProps>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;

	${({theme, backgroundColor}) => css`
		height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
		width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
		background-color: ${backgroundColor ?? theme.token.scheme.primaryContainer};
	`};
`

export const Content = styled(Shape)<AvatarContentProps>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;

	${({theme, size, density}) => {
		const densityScale = DENSITY_SCALE[density ?? theme.density] * theme.token.spacing.extraSmall

		return css`
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
