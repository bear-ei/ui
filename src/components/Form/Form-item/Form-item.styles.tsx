import styled, {css} from 'styled-components/native'

export const Container = styled.View`
	align-self: stretch;

	${({theme}) => css`
		min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
	`}
`
