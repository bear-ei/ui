import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'
import type {MenuListContainerProps} from './Menu-list.interface'

export const Container = styled(Shape)<MenuListContainerProps>`
	outline-style: none;
	overflow: hidden;

	${({theme, height}) => css`
		background-color: ${theme.token.scheme.surfaceContainer};
		height: ${height}px;
		width: ${theme.adaptSize(theme.token.spacing.extraSmall * 45)}px;
	`}
`
