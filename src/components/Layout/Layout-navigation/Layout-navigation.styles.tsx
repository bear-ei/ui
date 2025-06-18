import styled, {css} from 'styled-components/native'
import type {LayoutAnimatedProps} from '../../Layout-animated'
import {LayoutAnimated} from '../../Layout-animated'

export const Container = styled(LayoutAnimated)<LayoutAnimatedProps>`
	align-self: stretch;
	display: flex;
	flex-direction: column;

	${({theme}) => css`
		background-color: ${theme.token.scheme.surfaceContainer};
		max-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 100)}px;
		min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 20)}px;
	`}
`
