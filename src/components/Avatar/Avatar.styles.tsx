import styled, {css} from 'styled-components/native'
import {DENSITY_SCALE, Shape, Typography} from '../Common'
import type {AvatarContentProps} from './Avatar.interface'

export const Container = styled(Shape)`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;

	${({theme}) => css`
		height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
		width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
	`};
`

export const Content = styled(Shape)<AvatarContentProps>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;

	${({theme, size, density, backgroundColor}) => {
		const densityScale = DENSITY_SCALE[density ?? theme.density] * theme.token.spacing.extraSmall

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
