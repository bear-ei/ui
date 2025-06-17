import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import type {LayoutAnimatedContainerProps} from './Layout-animated.interface'

export const Container = styled(Shape)<LayoutAnimatedContainerProps>`
	display: flex;
	flex-direction: column;

	${({visible}) =>
		!visible &&
		css`
			z-index: -4096;
		`}
`
