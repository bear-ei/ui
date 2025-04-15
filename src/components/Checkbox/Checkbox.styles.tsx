import styled, {css} from 'styled-components/native'
import {DENSITY_SCALE, Shape} from '../Common'
import {LayoutAnimated} from '../Layout-animated'
import type {CheckboxContentProps, CheckboxIconLayoutProps} from './Checkbox.interface'

export const Container = styled.View`
	cursor: pointer;

	${({theme}) => css`
		height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
		width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
	`}
`

export const Content = styled(Shape)<CheckboxContentProps>`
	align-items: center;
	align-self: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	z-index: 4;

	${({theme, density}) => {
		const densityScale = DENSITY_SCALE[density ?? theme.density] * theme.token.spacing.extraSmall

		return css`
			height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10 + densityScale)}px;
			width: ${theme.adaptSize(theme.token.spacing.extraSmall * 10 + densityScale)}px;
		`
	}}
`

export const Main = styled(Shape)`
	overflow: hidden;
	position: relative;
	z-index: 4;

	${({theme}) => css`
		height: ${theme.adaptSize(theme.token.spacing.large + -1.5 * theme.token.spacing.extraSmall)}px;
		width: ${theme.adaptSize(theme.token.spacing.large + -1.5 * theme.token.spacing.extraSmall)}px;
	`}
`

export const IconLayout = styled(LayoutAnimated)<CheckboxIconLayoutProps>`
	position: absolute;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`}
`
