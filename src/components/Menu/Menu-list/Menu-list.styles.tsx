import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'
import type {MenuListContainerProps} from './Menu-list.interface'

export const Container = styled(Shape)<MenuListContainerProps>`
	overflow: hidden;

	${({theme, height}) => css`
		background-color: ${theme.token.scheme.surfaceContainer};
		height: ${height}px;
		max-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 100)}px;
		min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 36)}px;
		width: ${theme.adaptSize(theme.token.spacing.extraSmall * 45)}px;
	`}
`
