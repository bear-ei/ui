import styled, {css} from 'styled-components/native'
import {LAYOUT} from '../Common'
import type {ListContainerProps} from './List.interface'

export const Container = styled.View<ListContainerProps>`
	align-self: stretch;
	flex: 1;

	${({theme, layoutType}) =>
		layoutType === LAYOUT.VERTICAL ?
			css`
				padding: ${theme.adaptSize(theme.token.spacing.small)}px
					${theme.adaptSize(theme.token.spacing.none)}px;
			`
		:	css`
				padding: ${theme.adaptSize(theme.token.spacing.none)}px
					${theme.adaptSize(theme.token.spacing.small)}px;
			`};
`
