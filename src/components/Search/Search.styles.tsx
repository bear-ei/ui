import {SIZE, TYPOGRAPHY} from '@bearei/element-token'
import {css} from 'styled-components'
import styled from 'styled-components/native'
import {getScaledSpacing} from '../../utils'
import {Shape} from '../Common'
import type {SearchContentProps} from './Search.interface'

export const Container = styled.View`
	align-self: stretch;
	position: relative;
	z-index: 4096;
	justify-content: center;

	${({theme}) => css`
		min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
	`};
`

export const Touchable = styled.Pressable`
	cursor: text;
	outline-style: none;
`

export const Content = styled(Shape)<SearchContentProps>`
	align-items: center;
	align-self: stretch;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	position: relative;
	z-index: 4;

	${({theme, density}) => {
		const densityScale = getScaledSpacing(density)(theme)

		return css`
			/* background-color: ${theme.token.scheme.surfaceContainerHigh}; */
			gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
			height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + densityScale)}px;
			padding: ${theme.adaptSize(theme.token.spacing.none)}px
				${theme.adaptSize(theme.token.spacing.extraSmall)}px;
		`
	}};

	${({theme, trailingShow}) =>
		!trailingShow &&
		css`
			padding-right: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
		`};
`

export const Main = styled.View`
	align-self: stretch;
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: center;
	z-index: 4;
`

export const Leading = styled.View`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;

	${({theme}) => css`
		height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
		width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
	`}
`

export const Control = styled.View`
	${({theme}) => css`
		min-height: ${theme.adaptSize(theme.token.typography[TYPOGRAPHY.BODY][SIZE.LARGE].height)}px;
		min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 15)}px;
	`};
`

export const Input = styled.TextInput`
	align-self: stretch;
	flex: 1;
	outline-style: none;
	text-align: left;

	${({theme}) => css`
		font-size: ${theme.adaptFontSize(theme.token.typography[TYPOGRAPHY.BODY][SIZE.LARGE].size)}px;
		font-style: ${theme.token.typography[TYPOGRAPHY.BODY][SIZE.LARGE].style};
		font-weight: ${theme.token.typography[TYPOGRAPHY.BODY][SIZE.LARGE].weight};
		height: ${theme.adaptFontSize(theme.token.typography[TYPOGRAPHY.BODY][SIZE.LARGE].height)}px;
		letter-spacing: ${theme.adaptSize(theme.token.typography[TYPOGRAPHY.BODY][SIZE.LARGE].letterSpacing)}px;
		line-height: ${theme.adaptSize(theme.token.typography[TYPOGRAPHY.BODY][SIZE.LARGE].lineHeight)}px;
		padding: ${theme.adaptSize(theme.token.spacing.none)}px;
	`}
`

export const Trailing = styled(Leading)``
