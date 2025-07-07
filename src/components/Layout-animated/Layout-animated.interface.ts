import type {Duration, Easing} from '@bearei/element-token'
import type {RefAttributes} from 'react'
import type {TextStyle, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {
	AnimatedTimingOptions,
	AnimateSharedValueTo,
	HandleStateEventChangeOptions,
	InteractionHandlers
} from '../../hooks'
import type {ComponentStatus, LayoutRectangle, ShapeProps} from '../Common'
import type {LAYOUT_ANIMATED} from './Layout-animated.enum'

export type ContentSize = {width?: number; height?: number}
export type LayoutAnimatedType = (typeof LAYOUT_ANIMATED)[keyof typeof LAYOUT_ANIMATED]
export interface LayoutAnimatedProps extends Omit<ViewProps & RefAttributes<View> & ShapeProps, 'style'> {
	animatedType?: LayoutAnimatedType
	contentSize?: ContentSize | number
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

	delay?: number
	style?: AnimatedStyle<ViewStyle> | AnimatedStyle<TextStyle> | ViewStyle
	unmount?: boolean
	visible?: boolean
}

export interface RenderLayoutAnimatedProps extends Omit<LayoutAnimatedProps, 'contentSize'> {
	containerAnimatedStyle?: AnimatedStyle<ViewStyle>
	interactionHandlers: InteractionHandlers
	visible?: boolean
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

export type LayoutAnimatedBaseProps = LayoutAnimatedProps
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

export type UpdateLayoutAnimatedVisibilityOptions = Pick<LayoutAnimatedProps, 'onVisible' | 'animatedType'>
export type LayoutAnimatedContentProps = Pick<RenderLayoutAnimatedProps, 'visible'>
export type LayoutAnimatedContainerProps = Pick<LayoutAnimatedProps, 'visible'>
