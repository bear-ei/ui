import {View} from 'react-native'
import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'
import type {MenuListContainerProps} from './Menu-list.interface'

export const Container = styled(View)<MenuListContainerProps>`
	display: flex;
	flex-direction: column;

	${({theme, height}) => css`
		height: ${height}px;
		max-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 100)}px;
		min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 36)}px;
		width: ${theme.adaptSize(theme.token.spacing.extraSmall * 45)}px;
	`}
`

export const ListContainer = styled(Shape)`
	flex: 1;

	${({theme}) => css`
		background-color: ${theme.token.scheme.surfaceContainer};
	`}
`
