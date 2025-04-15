import styled, {css} from 'styled-components/native'

export const Container = styled.View`
	align-self: stretch;
	flex: 1;
	position: relative;
`

export const Content = styled.View`
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
	`};
`

export const Main = styled.View``
