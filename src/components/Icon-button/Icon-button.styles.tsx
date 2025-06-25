import styled, {css} from 'styled-components/native'
import {getScaledSpacing} from '../../utils'
import {Shape} from '../Common'
import {LayoutAnimated} from '../Layout-animated'
import type {IconButtonContentProps} from './Icon-button.interface'

export const Container = styled.View`
	cursor: pointer;
	position: relative;

<<<<<<< HEAD
	${({theme, density}) => {
		const densityScale = getScaledSpacing(density)(theme)

		return css`
			height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)}px;
			width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)}px;
		`
	}}

	${({loading}) => css`
		pointer-events: ${loading ? 'none' : 'auto'};
	`};
=======
	${({theme}) => css`
		height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
		width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
	`}
>>>>>>> parent of 6dc17cb (fix: fix pointerEvents)
`

export const ContentItemLayout = styled(LayoutAnimated)`
	align-items: center;
	display: flex;
	justify-content: center;
	position: absolute;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`}
`

export const Content = styled(Shape)<IconButtonContentProps>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;
	position: relative;
	z-index: 4;

	${({theme, size, density}) => {
		const densityScale = getScaledSpacing(density)(theme)

		return css`
			height: ${size ?? theme.adaptSize(theme.token.spacing.extraSmall * 10 + densityScale)}px;
			width: ${size ?? theme.adaptSize(theme.token.spacing.extraSmall * 10 + densityScale)}px;
		`
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

export const Main = styled.View`
	z-index: 4;
`
