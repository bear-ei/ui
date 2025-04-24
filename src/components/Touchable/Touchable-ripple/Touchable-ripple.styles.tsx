import {hexToRGBA} from '@bearei/material-token'
import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'
import type {TouchableRippleLayoutProps} from './Touchable-ripple.interface'

export const Container = styled(Shape)<TouchableRippleLayoutProps>`
	position: absolute;

	${({size = 0, locationX = 0, locationY = 0}) => css`
		height: ${size}px;
		left: ${locationX}px;
		top: ${locationY}px;
		width: ${size}px;
	`}

	${({underlayColor, theme}) => css`
		background-color: ${hexToRGBA(underlayColor ?? theme.token.scheme.onSurface)(
			theme.token.opacity.level2
		)};
	`};
`
