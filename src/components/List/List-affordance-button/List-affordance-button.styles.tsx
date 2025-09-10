import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../../Common'
import type {ListAffordanceButtonContainerProps} from './List-affordance-button.interface'

export const Container = styled.View<ListAffordanceButtonContainerProps>`
	align-self: stretch;
	cursor: pointer;
	display: flex;
	flex-direction: column;

	${({theme}) => css`
		min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 17)}px;
	`}
`

export const Content = styled.View`
	align-items: center;
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: center;
	pointer-events: none;
	position: relative;

	${({theme}) => css`
		min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 17)}px;
	`}
`

export const BackgroundUnderlay = styled(Shape)`
	pointer-events: none;
	position: absolute;
	z-index: -4;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`}
`

export const LabelText = styled(Typography)`
	text-align: center;
	user-select: none;
	z-index: 8;

	${({theme}) => css`
		color: ${theme.token.scheme.onPrimary};
	`}
`
