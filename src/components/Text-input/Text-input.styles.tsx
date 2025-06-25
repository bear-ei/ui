import {SIZE, TYPOGRAPHY} from '@bearei/element-token'
import styled, {css} from 'styled-components/native'
import {getScaledSpacing} from '../../utils'
import {Shape, Typography} from '../Common'
import {LayoutAnimated} from '../Layout-animated'
import type {
	TextInputControlProps,
	TextInputHeaderProps,
	TextInputLabelProps,
	TextInputMainProps,
	TextInputTouchableHeaderProps
} from './Text-input.interface'

export const Container = styled.View``
export const Content = styled.View`
	display: flex;
	flex-direction: column;

	${({theme}) => css`
		gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
	`}
`

export const TouchableHeader = styled.Pressable<TextInputTouchableHeaderProps>`
	cursor: text;
	outline-style: none;
`

export const Header = styled(Shape)<TextInputHeaderProps>`
	align-items: center;
	display: flex;
	flex-direction: row;
	position: relative;
	z-index: 4;

	${({theme, density}) => {
		const densityScale = getScaledSpacing(density)(theme)

		return css`
			min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
			height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + densityScale)}px;
			padding: ${theme.adaptSize(theme.token.spacing.extraSmall)}px
				${theme.adaptSize(theme.token.spacing.none)}px;

			gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
		`
	}}

	${({theme, leadingShow}) =>
		!leadingShow &&
		css`
			padding-left: ${theme.adaptSize(theme.token.spacing.medium)}px;
		`}

    ${({theme, trailingShow}) =>
		!trailingShow &&
		css`
			padding-right: ${theme.adaptSize(theme.token.spacing.medium)}px;
		`}
`

export const Label = styled.View<TextInputLabelProps>`
	display: flex;
	flex-direction: column;
	position: absolute;
	z-index: 8;
	transform-origin: top left;

	${({theme, density}) => {
		const densityScale = getScaledSpacing(density)(theme)

		return css`
			top: ${theme.adaptSize(theme.token.spacing.medium + densityScale / 2)}px;
			left: ${theme.adaptSize(theme.token.spacing.medium)}px;
		`
	}}

	${({theme, leadingShow}) =>
		leadingShow &&
		css`
			left: ${theme.adaptSize(
				theme.token.spacing.extraSmall * 12 + 1 * theme.token.spacing.extraSmall
			)}px;
		`}
`

export const LabelText = styled(Typography)``
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

export const Trailing = styled(Leading)``
export const Main = styled.View<TextInputMainProps>`
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: flex-end;
	z-index: 4;

	${({theme, density}) => {
		const densityScale = getScaledSpacing(density)(theme)

		return css`
			padding: ${theme.adaptSize(
					theme.token.spacing.large + -1 * theme.token.spacing.extraSmall + densityScale
				)}px
				${theme.adaptSize(theme.token.spacing.none)}px
				${theme.adaptSize(theme.token.spacing.extraSmall + densityScale)}px;
		`
	}};

	${({theme, contentShow, density}) => {
		const densityScale = getScaledSpacing(density)(theme)

		return (
			contentShow &&
			css`
				flex-direction: row;
				flex-wrap: wrap;
				gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px
					${theme.adaptSize(theme.token.spacing.small)}px;

				justify-content: flex-start;
				padding: ${theme.adaptSize(theme.token.spacing.large + densityScale)}px
					${theme.adaptSize(theme.token.spacing.none)}px
					${theme.adaptSize(theme.token.spacing.extraSmall + densityScale)}px;
			`
		)
	}};
`

export const Control = styled.View<TextInputControlProps>`
	align-self: stretch;
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: center;

	${({theme}) => css`
		min-height: ${theme.adaptSize(theme.token.typography[TYPOGRAPHY.BODY][SIZE.LARGE].lineHeight)}px;
		min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 15)}px;
		padding: ${theme.adaptSize(theme.token.spacing.extraSmall + -0.5 * theme.token.spacing.extraSmall)}px
			${theme.adaptSize(theme.token.spacing.none)}px;
	`};

	${({multiline, size = 0}) =>
		multiline &&
		css`
			min-height: ${size}px;
		`};
`

export const Input = styled.TextInput`
	outline-style: none;
	text-align: left;

	${({theme}) => css`
		align-self: stretch;
		flex: 1;
		font-size: ${theme.adaptFontSize(theme.token.typography[TYPOGRAPHY.BODY][SIZE.LARGE].size)}px;
		font-style: ${theme.token.typography[TYPOGRAPHY.BODY][SIZE.LARGE].style};
		font-weight: ${theme.token.typography[TYPOGRAPHY.BODY][SIZE.LARGE].weight};
		letter-spacing: ${theme.adaptSize(theme.token.typography[TYPOGRAPHY.BODY][SIZE.LARGE].letterSpacing)}px;
		padding: ${theme.adaptSize(theme.token.spacing.none)}px;
		text-align: left;
	`};
`

export const SupportingLayout = styled(LayoutAnimated)`
	${({theme}) => css`
		height: ${theme.adaptSize(theme.token.spacing.medium)}px;
		min-height: ${theme.adaptSize(theme.token.spacing.medium)}px;
	`}
`

export const SupportingText = styled(Typography)`
	${({theme}) => css`
		padding: ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.medium)}px;
	`}
`

export const ActiveIndicator = styled.View`
	position: absolute;
	z-index: 8;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		height: ${theme.adaptSize(theme.token.spacing.extraSmall - 1)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		transform-origin: bottom;
	`};
`
