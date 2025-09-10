import styled, {css} from 'styled-components/native'
import {getScaledSpacing} from '../../utils'
import {Shape} from '../Common'
import {LayoutAnimated} from '../Layout-animated'
import type {CheckboxContainerProps, CheckboxContentProps, CheckboxIconLayoutProps} from './Checkbox.interface'

export const Container = styled.View<CheckboxContainerProps>`
	cursor: pointer;

	${({theme, density}) => {
		const densityScale = getScaledSpacing(density)(theme)

		return css`
			height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10 + densityScale)}px;
			width: ${theme.adaptSize(theme.token.spacing.extraSmall * 10 + densityScale)}px;
		`
	}}
`

export const Content = styled(Shape)<CheckboxContentProps>`
	position: relative;
	z-index: 4;
	pointer-events: none;

	${({theme, density}) => {
		const densityScale = getScaledSpacing(density)(theme)

		return css`
			height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10 + densityScale)}px;
			width: ${theme.adaptSize(theme.token.spacing.extraSmall * 10 + densityScale)}px;
		`
	}}
`

export const Main = styled(Shape)`
	align-self: stretch;
	flex: 1;
	overflow: hidden;
	position: relative;
	z-index: 4;
`

export const IconLayout = styled(LayoutAnimated)<CheckboxIconLayoutProps>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: absolute;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`}
`
