import styled, {css} from 'styled-components/native'
import {LayoutAnimated} from '../Layout-animated'
import type {MaskContainerProps} from './Mask.interface'

export const ContainerLayout = styled(LayoutAnimated)<MaskContainerProps>`
	cursor: default;
	position: absolute;

	${({theme, backgroundColor}) => css`
		background-color: ${theme.token.palette.hexToRGBA(backgroundColor ?? theme.token.scheme.scrim)(
			theme.token.opacity.level4
		)};

		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
		z-index: 4096;
	`};
`

export const Content = styled.Pressable`
	flex: 1;
	outline-style: none;
`
