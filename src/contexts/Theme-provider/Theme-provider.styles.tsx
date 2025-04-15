import styled, {css} from 'styled-components/native'
import {ThemeContainerProps} from './Theme-provider.interface'

export const Container = styled.Pressable<ThemeContainerProps>`
	align-self: stretch;
	display: flex;
	flex-direction: column;
	flex: 1;
	outline-style: none;

	${({story}) =>
		story &&
		css`
			height: 800px;
		`}
`
