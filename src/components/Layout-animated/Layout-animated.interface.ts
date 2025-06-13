import type {Duration, Easing} from '@bearei/material-token'
import type {RefAttributes} from 'react'
import type {LayoutRectangle, StyleProp, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {
	AnimatedTimingOptions,
	AnimateSharedValueTo,
	HandleStateEventChangeOptions,
	InteractionHandlers
} from '../../hooks'
import type {ComponentStatus, ShapeProps} from '../Common'
import type {LAYOUT_ANIMATED} from './Layout-animated.enum'

export type ContentSize = {width?: number; height?: number}
export type LayoutAnimatedType = (typeof LAYOUT_ANIMATED)[keyof typeof LAYOUT_ANIMATED]
export interface LayoutAnimatedProps extends RefAttributes<View>, Omit<ViewProps, 'style'>, ShapeProps {
	animatedType?: LayoutAnimatedType
	contentSize?: ContentSize | number
	contentStyle?: ViewStyle
	defaultVisible?: boolean
	duration?: Duration
	easing?: Easing
	entry?: AnimatedTimingOptions
	exit?: AnimatedTimingOptions
	lazy?: boolean
	onUnmount?: () => void
	onVisible?: (visible?: boolean) => void
	opacity?: number

	// [ These parameters are only effective when the animation type is Collapse.
	scale?: boolean
	translate?: boolean
	// ]

	style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>> & StyleProp<ViewStyle>
	unmount?: boolean
	visible?: boolean
}

export interface RenderLayoutAnimatedProps extends Omit<LayoutAnimatedProps, 'contentSize'> {
	containerAnimatedStyle?: AnimatedStyle<ViewStyle>
	interactionHandlers: InteractionHandlers
	layout: LayoutRectangle
	status: ComponentStatus
	visible?: boolean
	contentSize?: ContentSize
}

export interface LayoutAnimatedState {
	invisible?: boolean
	layout: LayoutRectangle
	nextUnmountEvent?: () => void
	nextVisibilityEvent?: () => void
	status: ComponentStatus
	unmountLayout?: boolean
	visible?: boolean
}

export interface LayoutAnimatedBaseProps extends LayoutAnimatedProps {
	renderLayoutAnimated: (props: RenderLayoutAnimatedProps) => React.JSX.Element
}

export type FinalizeLayoutAnimatedVisibilityChangeOptions = Pick<RenderLayoutAnimatedProps, 'onUnmount' | 'unmount'>
export interface HandleLayoutAnimatedStateChangeOptions extends HandleStateEventChangeOptions {
	onLayoutChange: (layout: LayoutRectangle) => void
}

export interface UseLayoutAnimatedOptions
	extends Pick<
		LayoutAnimatedProps,
		'animatedType' | 'entry' | 'exit' | 'opacity' | 'scale' | 'unmount' | 'visible' | 'translate'
	> {
	onAnimationFinished: (visible?: boolean) => void
	height?: number
	status: ComponentStatus
	width?: number
}

export type UpdateLayoutAnimatedStatusOptions = Pick<LayoutAnimatedProps, 'lazy' | 'unmount'>
export interface AnimateLayoutAnimatedOptions extends Pick<LayoutAnimatedProps, 'animatedType'> {
	createEntrySharedValueAnimator: AnimateSharedValueTo
	createExitSharedValueAnimator: AnimateSharedValueTo
}

export type LayoutAnimatedContentProps = Pick<RenderLayoutAnimatedProps, 'visible'>
export interface HandleLayoutAnimatedTimingSharedValue {
	collapseSharedValue: SharedValue<number>
	fadeSharedValue: SharedValue<number>
}

export interface HandleLayoutAnimatedLayoutVisibilityOptions extends Pick<LayoutAnimatedProps, 'onVisible'> {
	setState: Updater<LayoutAnimatedState>
}

export interface LayoutAnimatedContainerProps
	extends Pick<LayoutAnimatedProps, 'visible' | 'animatedType' | 'translate'> {
	collapse?: boolean
	status: ComponentStatus
}

export interface ContentLayoutProps extends Pick<RenderLayoutAnimatedProps, 'visible' | 'layout'> {
	collapse?: boolean
}
