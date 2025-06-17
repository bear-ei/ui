import {View} from 'react-native'
import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import type {ElevationShadowProps} from './Elevation.interface'

export const Container = styled(View)`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: absolute;
	z-index: -8;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`};
`

export const Shadow = styled(Shape)<ElevationShadowProps>`
	align-self: stretch;
	flex: 1;

	${({theme}) => css`
		background-color: ${theme.token.scheme.surfaceContainerLow};
	`};
`
