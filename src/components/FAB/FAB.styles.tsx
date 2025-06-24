import {SIZE} from '@bearei/element-token'
import styled, {css} from 'styled-components/native'
import {getScaledSpacing} from '../../utils'
import {Shape, Typography} from '../Common'
import type {FABContainerProps, FABContentProps, FABMainProps} from './FAB.interface'

export const Container = styled.View<FABContainerProps>`
	align-self: flex-start;
	cursor: pointer;

	${({theme, size = SIZE.MEDIUM, density}) => {
		const densityScale = getScaledSpacing(density)(theme)
		const contentSize = {
			[SIZE.SMALL]: css`
				height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)}px;
				width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)}px;
			`,
			[SIZE.MEDIUM]: css`
				height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + densityScale)}px;
				width: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + densityScale)}px;
			`,
			[SIZE.LARGE]: css`
				height: ${theme.adaptSize(theme.token.spacing.extraSmall * 24 + densityScale)}px;
				width: ${theme.adaptSize(theme.token.spacing.extraSmall * 24 + densityScale)}px;
			`
		}

		return contentSize[size]
	}}

	${({theme, extendedFAB}) =>
		extendedFAB &&
		css`
			min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
			width: auto;
		`}

        ${({theme}) => css`
		min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
		min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
	`}
`

export const Content = styled(Shape)<FABContentProps>`
	align-items: center;
	display: flex;
	justify-content: center;
	overflow: hidden;
	position: relative;
	z-index: 4;

	${({theme, size = SIZE.MEDIUM, density}) => {
		const densityScale = getScaledSpacing(density)(theme)
		const contentSize = {
			[SIZE.SMALL]: css`
				height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10 + densityScale)}px;
				width: ${theme.adaptSize(theme.token.spacing.extraSmall * 10 + densityScale)}px;
			`,
			[SIZE.MEDIUM]: css`
				height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + densityScale)}px;
				width: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + densityScale)}px;
			`,
			[SIZE.LARGE]: css`
				height: ${theme.adaptSize(theme.token.spacing.extraSmall * 24 + densityScale)}px;
				width: ${theme.adaptSize(theme.token.spacing.extraSmall * 24 + densityScale)}px;
			`
		}

		return contentSize[size]
	}}

	${({theme, extendedFAB, density}) => {
		const densityScale = getScaledSpacing(density)(theme)

		return (
			extendedFAB &&
			css`
				height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + densityScale)}px;
				width: auto;
			`
		)
	}}
`

export const BackgroundUnderlay = styled(Shape)`
	position: absolute;
	z-index: -4;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`}
`

export const Main = styled.View<FABMainProps>`
	align-items: center;
	align-self: stretch;
	display: flex;
	flex-direction: row;
	flex: 1;
	justify-content: center;
	z-index: 4;

	${({theme, size = SIZE.MEDIUM}) => {
		const contentSize = {
			[SIZE.SMALL]: css`
				padding: ${theme.adaptSize(theme.token.spacing.none)}px
					${theme.adaptSize(theme.token.spacing.small)}px;
			`,
			[SIZE.MEDIUM]: css`
				padding: ${theme.adaptSize(theme.token.spacing.none)}px
					${theme.adaptSize(theme.token.spacing.medium)}px;
			`,
			[SIZE.LARGE]: css`
				padding: ${theme.adaptSize(theme.token.spacing.none)}px
					${theme.adaptSize(
						theme.token.spacing.extraLarge + -0.5 * theme.token.spacing.extraSmall
					)}px;
			`
		}

		return contentSize[size]
	}}

	${({theme, extendedFAB}) =>
		extendedFAB &&
		css`
			gap: ${theme.adaptSize(theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall)}px;
			padding: ${theme.adaptSize(theme.token.spacing.none)}px
				${theme.adaptSize(theme.token.spacing.large + -1 * theme.token.spacing.extraSmall)}px
				${theme.adaptSize(theme.token.spacing.none)}px
				${theme.adaptSize(theme.token.spacing.medium)}px;
		`}
`

export const LabelText = styled(Typography)`
	text-align: center;
	user-select: none;
`

export const IconLayout = styled.View`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;
`
