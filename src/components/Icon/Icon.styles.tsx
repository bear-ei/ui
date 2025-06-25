import styled, {css} from 'styled-components/native'
import {getScaledSpacing} from '../../utils'
import type {IconLayoutProps} from './Icon.interface'

export const Container = styled.View<IconLayoutProps>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;
	pointer-events: none;

	${({theme, size, density}) => {
		const densityScale = getScaledSpacing(density)(theme)

		return css`
			height: ${size ?? theme.adaptSize(theme.token.spacing.large + densityScale)}px;
			width: ${size ?? theme.adaptSize(theme.token.spacing.large + densityScale)}px;
		`
	}}
`
