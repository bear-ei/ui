import type {Duration, Easing} from '@bearei/element-token'
import type {RefAttributes} from 'react'
import type {StyleProp, TextStyle, View, ViewProps, ViewStyle} from 'react-native'
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
	onVisibility?: (visible?: boolean) => void
	opacity?: number

	// [ These parameters are only effective when the animation type is Collapse.
	scale?: boolean
	translate?: boolean
	// ]

	style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>> | StyleProp<AnimatedStyle<StyleProp<TextStyle>>>
	unmount?: boolean
	visible?: boolean
}

export interface RenderLayoutAnimatedProps extends Omit<LayoutAnimatedProps, 'contentSize'> {
	containerAnimatedStyle?: AnimatedStyle<ViewStyle>
	interactionHandlers: InteractionHandlers
	visible?: boolean
}

export interface LayoutAnimatedState {
	layout: LayoutRectangle
	nextUnmountEvent?: () => void
	nextVisibilityEvent?: () => void
	status: ComponentStatus
}

export type LayoutAnimatedBaseProps = LayoutAnimatedProps
export type FinalizeLayoutAnimatedVisibilityChangeOptions = Pick<
	RenderLayoutAnimatedProps,
	'onUnmount' | 'unmount' | 'onVisibility'
>

export interface HandleLayoutAnimatedStateChangeOptions extends HandleStateEventChangeOptions {
	onLayoutChange: (layout: LayoutRectangle) => void
}

export interface UseLayoutAnimatedOptions
	extends Pick<
		LayoutAnimatedProps,
		'animatedType' | 'entry' | 'exit' | 'opacity' | 'scale' | 'unmount' | 'visible' | 'translate'
	> {
	height?: number
	onAnimationFinished: (visible?: boolean) => void
	status: ComponentStatus
	width?: number
}

export interface AnimateLayoutAnimatedOptions extends Pick<LayoutAnimatedProps, 'animatedType'> {
	createEntrySharedValueAnimator: AnimateSharedValueTo
	createExitSharedValueAnimator: AnimateSharedValueTo
}

export type LayoutAnimatedContainerProps = Pick<LayoutAnimatedProps, 'visible'>
export type LayoutAnimatedContentProps = Pick<RenderLayoutAnimatedProps, 'visible'>
