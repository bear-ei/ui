import styled, {css} from 'styled-components/native'
import {COMPONENT_STATUS, Shape} from '../Common'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import type {ContentLayoutProps, LayoutAnimatedContainerProps} from './Layout-animated.interface'

export const Container = styled(Shape)<LayoutAnimatedContainerProps>`
	position: relative;

	${({visible, theme, collapse, status}) =>
		!visible &&
		!collapse &&
		status === COMPONENT_STATUS.SUCCEEDED &&
		css`
			max-height: ${theme.adaptSize(theme.token.spacing.none)}px;
		`}

	${({visible}) =>
		!visible &&
		css`
			z-index: -4096;
		`}

        ${({collapse}) =>
		collapse &&
		css`
			overflow: hidden;
		`}


	${({animatedType, visible}) =>
		animatedType !== LAYOUT_ANIMATED.STANDARD &&
		!visible &&
		css`
			overflow: hidden;
		`}
`

export const ContentLayout = styled.View<ContentLayoutProps>`
	position: absolute;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`};

	${({layout, visible}) =>
		typeof layout?.height === 'number' &&
		!visible &&
		css`
			min-height: ${layout.height}px;
		`}

	${({layout, visible}) =>
		typeof layout?.height === 'number' &&
		!visible &&
		css`
			min-width: ${layout.width}px;
		`}
`

export const Content = styled.View`
	display: flex;
	align-self: stretch;
	flex: 1;
`
