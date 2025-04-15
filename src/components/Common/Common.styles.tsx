import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import styled, {css} from 'styled-components/native'
import type {ShapeProps, TypographyProps} from './Common.interface'

export const Shape = styled.View<ShapeProps>`
	${({shape = SHAPE.NONE, theme}) => css`
		border-bottom-left-radius: ${theme.adaptSize(theme.token.shape[shape].bottomLeft)}px;
		border-bottom-right-radius: ${theme.adaptSize(theme.token.shape[shape].bottomRight)}px;
		border-color: transparent;
		border-top-left-radius: ${theme.adaptSize(theme.token.shape[shape].topLeft)}px;
		border-top-right-radius: ${theme.adaptSize(theme.token.shape[shape].topRight)}px;
		border-width: ${theme.adaptSize(theme.token.spacing.none)}px;
	`}
`

export const Typography = styled.Text<TypographyProps>`
	${({theme, type = TYPOGRAPHY.BODY, size = SIZE.MEDIUM}) => css`
		color: ${theme.token.scheme.onSurfaceVariant};
		font-family: ${theme.token.font.family};
		font-size: ${theme.adaptFontSize(theme.token.typography[type][size].size)}px;
		font-style: ${theme.token.typography[type][size].style};
		font-weight: ${theme.token.typography[type][size].weight};
		height: ${theme.adaptSize(theme.token.typography[type][size].lineHeight)}px;
		letter-spacing: ${theme.adaptSize(theme.token.typography[type][size].letterSpacing)}px;
		line-height: ${theme.adaptSize(theme.token.typography[type][size].lineHeight)}px;
		min-height: ${theme.adaptSize(theme.token.typography[type][size].lineHeight)}px;
	`}

	${({multiline}) =>
		multiline &&
		css`
			height: auto;
			min-height: auto;
		`}
`
