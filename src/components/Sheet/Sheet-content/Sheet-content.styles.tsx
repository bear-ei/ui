import type {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../../Common'
import {LayoutAnimated} from '../../Layout-animated'
import {SIDE_SHEET_POSITION, SIDE_SHEET_TYPE} from '../Sheet.enum'
import type {SheetPosition, SheetType} from '../Sheet.interface'
import type {
	SheetContainerProps,
	SheetFooterProps,
	SheetHeaderProps,
	SheetViewContentProps
} from './Sheet-content.interface'

export const Container = styled.View<SheetContainerProps>`
	align-self: stretch;
	display: flex;
	flex-direction: row;
	flex: 1;
	overflow: hidden;

	${({position = SIDE_SHEET_POSITION.HORIZONTAL_END, type}) => {
		const contentPosition = {
			[SIDE_SHEET_POSITION.HORIZONTAL_START]: css`
				justify-content: flex-start;
			`,
			[SIDE_SHEET_POSITION.HORIZONTAL_END]: css`
				justify-content: flex-end;
			`
		} as Record<SheetPosition, RuleSet<object> | undefined>

		return type === SIDE_SHEET_TYPE.MODAL && contentPosition[position]
	}}

	${({theme, type = SIDE_SHEET_TYPE.SIDEBAR}) => {
		const contentType = {
			[SIDE_SHEET_TYPE.MODAL]: css``,
			[SIDE_SHEET_TYPE.SIDEBAR]: css`
				min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 64)}px;
			`
		} as Record<SheetType, RuleSet<object> | undefined>

		return contentType[type]
	}}
`

export const Content = styled(Shape)<SheetViewContentProps>`
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: hidden;
	position: relative;

	${({theme, type = SIDE_SHEET_TYPE.SIDEBAR}) => {
		const contentType = {
			[SIDE_SHEET_TYPE.MODAL]: css`
				background-color: ${theme.token.scheme.surfaceContainerLow};
				min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 80)}px;
			`,
			[SIDE_SHEET_TYPE.SIDEBAR]: css`
				background-color: ${theme.token.scheme.surfaceContainerLow};
				min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 64)}px;
			`
		} as Record<SheetType, RuleSet<object> | undefined>

		return contentType[type]
	}}
`

export const Header = styled.View<SheetHeaderProps>`
	align-self: stretch;
	display: flex;
	flex-direction: row;

	${({theme}) => css`
		padding: ${theme.adaptSize(theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall)}px
			${theme.adaptSize(theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall)}px
			${theme.adaptSize(theme.token.spacing.medium)}px
			${theme.adaptSize(theme.token.spacing.extraSmall)}px;
	`}

	${({theme, type = SIDE_SHEET_TYPE.SIDEBAR}) => {
		const contentType = {
			[SIDE_SHEET_TYPE.MODAL]: css`
				padding: ${theme.adaptSize(
						theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
					)}px
					${theme.adaptSize(theme.token.spacing.extraSmall)}px
					${theme.adaptSize(theme.token.spacing.medium)}px
					${theme.adaptSize(theme.token.spacing.extraSmall)}px;
			`,
			[SIDE_SHEET_TYPE.SIDEBAR]: css`
				padding: ${theme.adaptSize(
						theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
					)}px
					${theme.adaptSize(theme.token.spacing.extraSmall)}px
					${theme.adaptSize(theme.token.spacing.medium)}px
					${theme.adaptSize(theme.token.spacing.extraSmall)}px;
			`
		} as Record<SheetType, RuleSet<object> | undefined>

		return contentType[type]
	}}

	${({theme, leadingShow, type = SIDE_SHEET_TYPE.SIDEBAR}) => {
		const contentType = {
			[SIDE_SHEET_TYPE.MODAL]:
				!leadingShow &&
				css`
					padding-left: ${theme.adaptSize(theme.token.spacing.large)}px;
				`,
			[SIDE_SHEET_TYPE.SIDEBAR]:
				!leadingShow &&
				css`
					padding-left: ${theme.adaptSize(theme.token.spacing.large)}px;
				`
		} as Record<SheetType, RuleSet<object> | undefined>

		return contentType[type]
	}}


	${({theme, trailingShow, type = SIDE_SHEET_TYPE.SIDEBAR}) => {
		const contentType = {
			[SIDE_SHEET_TYPE.MODAL]:
				!trailingShow &&
				css`
					padding-right: ${theme.adaptSize(theme.token.spacing.large)}px;
				`,
			[SIDE_SHEET_TYPE.SIDEBAR]:
				!trailingShow &&
				css`
					padding-right: ${theme.adaptSize(theme.token.spacing.large)}px;
				`
		} as Record<SheetType, RuleSet<object> | undefined>

		return contentType[type]
	}}
`

export const HeadlineLayout = styled.View`
	align-items: center;
	display: flex;
	flex-direction: row;
	flex: 1;

	${({theme}) => css`
		height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
	`}
`

export const HeaderText = styled(Typography)`
	${({theme}) => css`
		color: ${theme.token.scheme.onSurfaceVariant};
	`}
`

export const Leading = styled.View`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;

	${({theme}) => css`
		height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
		min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
	`}
`

export const Trailing = styled(Leading)``
export const Main = styled.View`
	align-self: stretch;
	flex: 1;
`

export const PrimaryButton = styled.View`
	${({theme}) => css`
		min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
		min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 23)}px;
	`}
`

export const SecondaryButton = styled.View`
	${({theme}) => css`
		min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
		min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 23)}px;
	`}
`

export const FooterLayoutAnimated = styled(LayoutAnimated)`
	position: absolute;
	transform-origin: bottom;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
	`}
`
export const FooterLayout = styled.View`
	${({theme}) => css`
		max-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 20)}px;
		min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 20)}px;
	`}
`

export const Footer = styled.View<SheetFooterProps>`
	display: flex;
	flex-direction: row;

	${({theme}) => css`
		gap: ${theme.adaptSize(theme.token.spacing.small)}px;
	`}

	${({theme, type = SIDE_SHEET_TYPE.SIDEBAR}) => {
		const footerType = {
			[SIDE_SHEET_TYPE.MODAL]: css`
				background-color: ${theme.token.scheme.surfaceContainerLow};
				padding: ${theme.adaptSize(
						theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
					)}px
					${theme.adaptSize(theme.token.spacing.large)}px
					${theme.adaptSize(
						theme.token.spacing.large + -1 * theme.token.spacing.extraSmall
					)}px;
			`,
			[SIDE_SHEET_TYPE.SIDEBAR]: css`
				background-color: ${theme.token.scheme.surfaceContainerLow};
				padding: ${theme.adaptSize(
						theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
					)}px
					${theme.adaptSize(theme.token.spacing.large)}px
					${theme.adaptSize(
						theme.token.spacing.large + -1 * theme.token.spacing.extraSmall
					)}px;
			`
		} as Record<SheetType, RuleSet<object> | undefined>

		return footerType[type]
	}}
`
