import type {Duration, Easing} from '@bearei/material-token'
import type {RefAttributes} from 'react'
import type {LayoutRectangle, StyleProp, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {
	AnimatedTiming,
	AnimatedTimingOptions,
	HandleStateEventChangeOptions,
	InteractionHandlers
} from '../../hooks'
import type {ComponentStatus, ShapeProps} from '../Common'
import type {LAYOUT_ANIMATED} from './Layout-animated.enum'

export type LayoutAnimatedType = (typeof LAYOUT_ANIMATED)[keyof typeof LAYOUT_ANIMATED]
export interface LayoutAnimatedProps extends RefAttributes<View>, Omit<ViewProps, 'style'>, ShapeProps {
	animatedType?: LayoutAnimatedType
	contentStyle?: ViewStyle
	defaultVisible?: boolean
	delay?: number
	duration?: Duration
	easing?: Easing
	entry?: AnimatedTimingOptions
	exit?: AnimatedTimingOptions
	lazy?: boolean
	onUnmount?: () => void
	onVisible?: (visible?: boolean) => void
	opacity?: number

	/**
	 * Whether or not to enable scale effects in collapse type animations
	 */
	scale?: boolean
	style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>> & StyleProp<ViewStyle>
	unmount?: boolean
	visible?: boolean
}

export interface RenderLayoutAnimatedProps extends LayoutAnimatedProps {
	containerAnimatedStyle?: AnimatedStyle<ViewStyle>
	interactionHandlers: InteractionHandlers
	layout: LayoutRectangle
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

export interface LayoutAnimatedBaseProps extends LayoutAnimatedProps {
	renderLayoutAnimated: (props: RenderLayoutAnimatedProps) => React.JSX.Element
}

export type FinalizeLayoutAnimatedVisibilityChangeOptions = Pick<RenderLayoutAnimatedProps, 'onUnmount' | 'unmount'>
export interface HandleLayoutAnimatedStateChangeOptions extends HandleStateEventChangeOptions {
	onLayoutChange: (layout: LayoutRectangle) => Promise<void>
}

export interface UseLayoutAnimatedOptions
	extends Pick<
		LayoutAnimatedProps,
		'animatedType' | 'entry' | 'exit' | 'opacity' | 'scale' | 'unmount' | 'visible'
	> {
	onAnimationFinished: (visible?: boolean) => void
	height?: number
	width?: number
}

export type UpdateLayoutAnimatedStatusOptions = Pick<LayoutAnimatedProps, 'lazy' | 'unmount'>
export interface AnimateLayoutAnimatedOptions
	extends Pick<UseLayoutAnimatedOptions, 'onAnimationFinished' | 'entry' | 'exit'> {
	animatedTiming: AnimatedTiming
}

export type LayoutAnimatedContentProps = Pick<RenderLayoutAnimatedProps, 'visible'>
export interface HandleLayoutAnimatedTimingSharedValue {
	collapseSharedValue: SharedValue<number>
	fadeSharedValue: SharedValue<number>
}

export interface HandleLayoutAnimatedLayoutVisibilityOptions extends Pick<LayoutAnimatedProps, 'onVisible'> {
	setState: Updater<LayoutAnimatedState>
}

export interface LayoutAnimatedContainerProps extends Pick<LayoutAnimatedProps, 'visible'> {
	collapse?: boolean
}

export type ContentLayoutProps = Pick<RenderLayoutAnimatedProps, 'visible' | 'layout'>
