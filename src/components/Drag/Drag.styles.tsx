import {View} from 'react-native'
import styled, {css} from 'styled-components/native'

export const Container = styled(View)`
	pointer-events: 'box-none';
	position: absolute;
	z-index: 1024;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`};

	${({theme}) => css`
		min-height: ${theme.adaptSize(theme.token.spacing.large)}px;
		min-width: ${theme.adaptSize(theme.token.spacing.large)}px;
	`};
`

export const Content = styled.View`
	position: absolute;
	z-index: 1024;
`
