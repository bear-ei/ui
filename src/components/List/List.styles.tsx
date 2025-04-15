import styled, {css} from 'styled-components/native'

export const Container = styled.View`
	align-self: stretch;
	flex: 1;

	${({theme}) => css`
		padding: ${theme.adaptSize(theme.token.spacing.small)}px ${theme.adaptSize(theme.token.spacing.none)}px;
	`};
`
