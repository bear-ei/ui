import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus, LayoutRectangle, PartialSize} from '../../constants'
import type {AnimatedTimingOptions, HandleStateEventChangeOptions, InteractionHandlers} from '../../hooks'
import type {ThemeProps} from '../../theme'
import type {LAYOUT_ANIMATED} from './Layout-animated.enum'

export type LayoutAnimatedType = (typeof LAYOUT_ANIMATED)[keyof typeof LAYOUT_ANIMATED]
export interface LayoutAnimatedProps extends Omit<ViewProps & RefAttributes<View> & ThemeProps, 'style'> {
	animatedType?: LayoutAnimatedType
	contentSize?: PartialSize | number
	defaultVisible?: boolean
	delay?: number
	entry?: AnimatedTimingOptions
	exit?: AnimatedTimingOptions
	lazy?: boolean
	onAnimationFinished?: (visible?: boolean) => void
	onUnmount?: () => void
	onVisible?: (visible?: boolean) => void
	opacity?: number

	// [ These parameters are only effective when the animation type is Collapse.
	outputRanges?: number[]
	scale?: boolean
	style?: AnimatedStyle<ViewStyle>
	// ]

	translate?: boolean
	unmount?: boolean
	visible?: boolean
}

export interface RenderLayoutAnimatedProps extends Omit<LayoutAnimatedProps, 'contentSize'> {
	containerAnimatedStyle?: AnimatedStyle<ViewStyle> | AnimatedStyle<ViewStyle>[]
	interactionHandlers: InteractionHandlers
	visible?: boolean
}

export interface LayoutAnimatedState {
	layout: Partial<LayoutRectangle>
	pendingAnimationFinishedEvent?: boolean
	pendingUnmountEvent?: boolean
	pendingVisibleEvent?: boolean
	status: ComponentStatus
	visible?: boolean
}

export type LayoutAnimatedBaseProps = LayoutAnimatedProps
export type FinalizeLayoutAnimatedVisibleChangeOptions = Pick<
	RenderLayoutAnimatedProps,
	'onUnmount' | 'unmount' | 'onAnimationFinished'
>

export interface HandleLayoutAnimatedStateChangeOptions extends HandleStateEventChangeOptions {
	onLayoutChange: (layout: LayoutRectangle) => void
}

export interface UseLayoutAnimatedOptions extends Pick<
	LayoutAnimatedProps,
	| 'animatedType'
	| 'delay'
	| 'entry'
	| 'exit'
	| 'opacity'
	| 'outputRanges'
	| 'scale'
	| 'translate'
	| 'unmount'
	| 'visible'
> {
	height?: number
	onAnimationFinished: (visible?: boolean) => void
	status: ComponentStatus
	width?: number
}

export type AnimateLayoutAnimatedOptions = Pick<
	UseLayoutAnimatedOptions,
	'animatedType' | 'entry' | 'exit' | 'onAnimationFinished'
>
