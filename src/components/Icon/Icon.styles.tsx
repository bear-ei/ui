import styled, {css} from 'styled-components/native'
import type {IconLayoutProps} from './Icon.interface'

export const Container = styled.View<IconLayoutProps>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;
	pointer-events: none;

	${({theme, size}) => css`
		height: ${size ?? theme.adaptSize(theme.token.spacing.large)}px;
		width: ${size ?? theme.adaptSize(theme.token.spacing.large)}px;
	`}
`
