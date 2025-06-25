import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import type {ActiveLayerProps, HoverLayerProps} from './Underlay.interface'

export const Container = styled(Shape)`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;
	overflow: hidden;
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

export const HoverLayer = styled(Shape)<HoverLayerProps>`
	position: absolute;
	z-index: 8;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`}

	${({underlayColor}) =>
		underlayColor &&
		css`
			background-color: ${underlayColor};
		`}
`

export const ActiveLayer = styled(Shape)<ActiveLayerProps>`
	position: absolute;
	z-index: 4;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`}

	${({activeColor}) =>
		activeColor &&
		css`
			background-color: ${activeColor};
		`}
`
