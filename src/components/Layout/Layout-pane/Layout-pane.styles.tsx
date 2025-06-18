import styled, {css} from 'styled-components/native'
import type {LayoutAnimatedProps} from '../../Layout-animated'
import {LayoutAnimated} from '../../Layout-animated'

export const Container = styled(LayoutAnimated)<LayoutAnimatedProps>`
	align-self: stretch;
	display: flex;
	flex-direction: column;
	flex: 1;

	${({theme}) => css`
		background-color: ${theme.token.scheme.surface};
	`}
`
