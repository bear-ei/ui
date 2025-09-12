import type {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {getScaledSpacing} from '../../../utils'
import {Shape, Typography} from '../../Common'
import {LayoutAnimated} from '../../Layout-animated'
import {LIST_TYPE} from '../List.enum'
import type {ListType} from '../List.interface'
import type {
	AffordanceLayoutProps,
	ListItemContainerProps,
	ListItemContentProps,
	ListItemItemTouchableProps,
	ListItemLeadingProps,
	ListItemMainInnerProps,
	ListItemMainProps,
	ListItemTrailingProps
} from './List-item.interface'

export const Container = styled(Shape)<ListItemContainerProps>`
	align-self: stretch;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	position: relative;

	${({theme, type = LIST_TYPE.STANDARD, density}) => {
		const densityScale = getScaledSpacing(density)(theme)
		const containerType = {
			[LIST_TYPE.LABEL]: css`
				height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10 + densityScale)}px;
				min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)}px;
			`,
			[LIST_TYPE.MENU]: css`
				height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)}px;
				min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)}px;
			`,
			[LIST_TYPE.STANDARD]: css`
				height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + densityScale)}px;
				min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + densityScale)}px;
			`
		} as Record<ListType, RuleSet<object> | undefined>

		return containerType[type]
	}}

	${({theme}) => css`
		min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
		min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
	`};
`

export const Content = styled.View<ListItemContentProps>`
	position: absolute;
	z-index: 4;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`};

	${({theme, type = LIST_TYPE.STANDARD}) => {
		const contentType = {
			[LIST_TYPE.LABEL]: css`
				background-color: ${theme.token.scheme.surfaceContainer};
			`,
			[LIST_TYPE.MENU]: css`
				background-color: ${theme.token.scheme.surfaceContainer};
			`,
			[LIST_TYPE.STANDARD]: css`
				background-color: ${theme.token.scheme.surface};
			`
		} as Record<ListType, RuleSet<object> | undefined>

		return contentType[type]
	}}
`

export const Touchable = styled.Pressable<ListItemItemTouchableProps>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	outline-style: none;
`

export const Main = styled(Shape)<ListItemMainProps>`
	align-items: center;
	align-self: stretch;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	overflow: hidden;
	position: relative;
	z-index: 4;

	${({theme, type = LIST_TYPE.STANDARD, density}) => {
		const densityScale = getScaledSpacing(density)(theme)
		const mainType = {
			[LIST_TYPE.LABEL]: css`
				height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10 + densityScale)}px;
				min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)}px;
				padding: ${theme.adaptSize(theme.token.spacing.none)}px
					${theme.adaptSize(
						theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
					)}px;
			`,
			[LIST_TYPE.MENU]: css`
				height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)}px;
				min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)}px;
				padding: ${theme.adaptSize(theme.token.spacing.none)}px
					${theme.adaptSize(
						theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
					)}px;
			`,
			[LIST_TYPE.STANDARD]: css`
				height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + densityScale)}px;
				min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + densityScale)}px;
				padding: ${theme.adaptSize(theme.token.spacing.none)}px
					${theme.adaptSize(theme.token.spacing.medium)}px;
			`
		} as Record<ListType, RuleSet<object> | undefined>

		return mainType[type]
	}}

	${({theme, supportingTextShow}) =>
		supportingTextShow &&
		css`
			padding-bottom: ${theme.adaptSize(theme.token.spacing.small)}px;
			padding-top: ${theme.adaptSize(theme.token.spacing.small)}px;
		`}


        ${({theme, supportingTextNumberOfLines = 0}) =>
		supportingTextNumberOfLines > 1 &&
		css`
			padding-bottom: ${theme.adaptSize(
				theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
			)}px;

			padding-top: ${theme.adaptSize(
				theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
			)}px;
		`}



	${({theme, type = LIST_TYPE.STANDARD, trailingShow}) => {
		const mainType = {
			[LIST_TYPE.LABEL]: css`
				padding: ${theme.adaptSize(theme.token.spacing.none)}px
					${theme.adaptSize(
						theme.token.spacing.small + -0.5 * theme.token.spacing.extraSmall
					)}px
					${theme.adaptSize(theme.token.spacing.none)}px
					${theme.adaptSize(
						theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
					)}px;
			`,
			[LIST_TYPE.MENU]: css`
				padding: ${theme.adaptSize(theme.token.spacing.none)}px
					${theme.adaptSize(theme.token.spacing.extraSmall)}px
					${theme.adaptSize(theme.token.spacing.none)}px
					${theme.adaptSize(
						theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
					)}px;
			`,
			[LIST_TYPE.STANDARD]: css`
				padding: ${theme.adaptSize(theme.token.spacing.none)}px
					${theme.adaptSize(theme.token.spacing.small)}px
					${theme.adaptSize(theme.token.spacing.none)}px
					${theme.adaptSize(theme.token.spacing.medium)}px;
			`
		} as Record<ListType, RuleSet<object> | undefined>

		return trailingShow && mainType[type]
	}}
`

export const Leading = styled.View<ListItemLeadingProps>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;

	${({supportingTextNumberOfLines = 0}) =>
		supportingTextNumberOfLines > 1 &&
		css`
			justify-content: flex-start;
		`}
`

export const MainInner = styled.View<ListItemMainInnerProps>`
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: center;
	pointer-events: none;

	${({theme, supportingTextShow}) =>
		supportingTextShow &&
		css`
			min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
		`}

	${({theme, type = LIST_TYPE.STANDARD, leadingShow}) => {
		const mainInnerType = {
			[LIST_TYPE.LABEL]: css`
				padding-left: ${theme.adaptSize(
					theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
				)}px;
			`,
			[LIST_TYPE.MENU]: css`
				padding-left: ${theme.adaptSize(
					theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
				)}px;
			`,
			[LIST_TYPE.STANDARD]: css`
				padding-left: ${theme.adaptSize(theme.token.spacing.medium)}px;
			`
		} as Record<ListType, RuleSet<object> | undefined>

		if (leadingShow) {
			return mainInnerType[type]
		}
	}}


        ${({theme, type = LIST_TYPE.STANDARD, trailingShow}) => {
		const mainInnerType = {
			[LIST_TYPE.LABEL]: css`
				padding-right: ${theme.adaptSize(
					theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
				)}px;
			`,
			[LIST_TYPE.MENU]: css`
				padding-right: ${theme.adaptSize(
					theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
				)}px;
			`,
			[LIST_TYPE.STANDARD]: css`
				padding-right: ${theme.adaptSize(theme.token.spacing.medium)}px;
			`
		} as Record<ListType, RuleSet<object> | undefined>

		return trailingShow && mainInnerType[type]
	}}
`

export const TrailingLayout = styled.View<ListItemTrailingProps>`
	display: flex;
	flex-direction: column;

	${({supportingTextNumberOfLines = 0}) =>
		supportingTextNumberOfLines > 1 &&
		css`
			justify-content: flex-start;
		`}
`

export const Trailing = styled(LayoutAnimated)``
export const HeadlineText = styled(Typography)``
export const SupportingText = styled(Typography)`
	height: auto;

	${({theme}) => css`
		color: ${theme.token.scheme.onSurfaceVariant};
	`}
`

export const BeforeAffordanceLayout = styled.View<AffordanceLayoutProps>`
	align-items: center;
	display: flex;
	flex-direction: row;
	justify-content: center;
`

export const AfterAffordanceLayout = styled(BeforeAffordanceLayout)`
	align-self: flex-end;
	flex: 1;

	${({afterAffordanceExpanded}) =>
		afterAffordanceExpanded &&
		css`
			z-index: 8;
		`};
`

export const DividerLayout = styled.View`
	position: absolute;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		height: ${theme.adaptSize(theme.token.spacing.extraSmall / 4)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		z-index: 8;
	`};
`
