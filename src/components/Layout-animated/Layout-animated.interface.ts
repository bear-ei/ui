import type {RefAttributes} from 'react'
import type {StyleProp, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus, MeasuredLayoutRectangle, PartialSize} from '../../constants'
import type {AnimatedTimingOptions, HandleInteractionStateChangeOptions, InteractionHandlers} from '../../hooks'
import type {ThemeableProps} from '../../theme'
import type {LAYOUT_ANIMATION} from './Layout-animated.enum'

export type LayoutAnimationType = (typeof LAYOUT_ANIMATION)[keyof typeof LAYOUT_ANIMATION]
export interface LayoutAnimatedProps extends Omit<ViewProps & RefAttributes<View> & ThemeableProps, 'style'> {
	animation?: LayoutAnimationType
	contentSize?: PartialSize | number
	debounceDelay?: number
	defaultVisible?: boolean
	entry?: AnimatedTimingOptions
	exit?: AnimatedTimingOptions
	lazyMount?: boolean
	onAnimationFinished?: (visible?: boolean) => void
	onUnmount?: () => void
	onVisibleChange?: (visible?: boolean) => void
	opacity?: number

	// [ These parameters are only effective when the animation type is Collapse.
	outputRanges?: number[]
	scaleOnCollapse?: boolean
	style?: StyleProp<AnimatedStyle<ViewStyle>>
	// ]

	translateOnCollapse?: boolean
	unmountOnHide?: boolean
	visible?: boolean
}

export interface RenderLayoutAnimatedProps extends Omit<LayoutAnimatedProps, 'contentSize'> {
	containerAnimatedStyle?: AnimatedStyle<ViewStyle> | AnimatedStyle<ViewStyle>[]
	interactionHandlers: InteractionHandlers
	visible?: boolean
}

export interface LayoutAnimatedState {
	layout: Partial<MeasuredLayoutRectangle>
	pendingAnimationFinishedEvent?: boolean
	pendingUnmountEvent?: boolean
	pendingVisibleEvent?: boolean
	status: ComponentStatus
	visible?: boolean
}

export type LayoutAnimatedBaseProps = LayoutAnimatedProps
export type FinalizeLayoutAnimatedVisibleChangeOptions = Pick<
	RenderLayoutAnimatedProps,
	'onUnmount' | 'unmountOnHide' | 'onAnimationFinished'
>

export interface HandleLayoutAnimatedInteractionStateChangeOptions extends HandleInteractionStateChangeOptions {
	onLayoutChange: (layout: MeasuredLayoutRectangle) => void
}

export interface UseLayoutAnimatedOptions extends Pick<
	LayoutAnimatedProps,
	| 'animation'
	| 'debounceDelay'
	| 'entry'
	| 'exit'
	| 'opacity'
	| 'outputRanges'
	| 'scaleOnCollapse'
	| 'translateOnCollapse'
	| 'unmountOnHide'
	| 'visible'
> {
	height?: number
	onAnimationFinished: (visible?: boolean) => void
	status: ComponentStatus
	width?: number
}

export type AnimateLayoutAnimatedOptions = Pick<
	UseLayoutAnimatedOptions,
	'animation' | 'entry' | 'exit' | 'onAnimationFinished'
>
