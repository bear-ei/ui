import type {Duration, Easing, Token} from '@bearei/material-token'
import type {MutableRefObject} from 'react'
import type {
	GestureResponderEvent,
	LayoutChangeEvent,
	MouseEvent,
	NativeSyntheticEvent,
	PressableProps,
	ScrollViewProps,
	TargetedEvent
} from 'react-native'
import type {AnimationCallback, SharedValue, WithTimingConfig} from 'react-native-reanimated'
import type {EventName, State} from '../components'

export type StateEvent = GestureResponderEvent | LayoutChangeEvent | MouseEvent | NativeSyntheticEvent<TargetedEvent>
export type InteractionHandlers = {
	onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void
	onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void
	onHoverIn?: (event: MouseEvent) => void
	onHoverOut?: (event: MouseEvent) => void
	onLayout?: (event: LayoutChangeEvent) => void
	onLongPress?: (event: GestureResponderEvent) => void
	onPress?: (event: GestureResponderEvent) => void
	onPressIn?: (event: GestureResponderEvent) => void
	onPressOut?: (event: GestureResponderEvent) => void
}

export interface UseHandleStateEventOptions extends Partial<PressableProps & InteractionHandlers> {
	disabled?: boolean
	onStateEventChange?: (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) => void
}

export interface HandleStateEventChangeOptions
	extends Pick<UseHandleStateEventOptions, 'disabled' | 'onStateEventChange'> {
	callback?: () => void
	eventName?: EventName
	state?: State
}

export interface HandleStateEventOptions {
	mobileDevice?: boolean
	interactionHandlers: (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) => void
}

export type UseDesktopScrollEventOptions = Pick<ScrollViewProps, 'onScroll' | 'onMomentumScrollEnd'>
export interface HandleScrollOptions extends Pick<ScrollViewProps, 'onScroll' | 'onMomentumScrollEnd'> {
	momentumScrollEndTimer: MutableRefObject<ReturnType<typeof setTimeout> | null>
}

export interface AnimatedTimingOptions extends Omit<WithTimingConfig, 'duration' | 'easing'> {
	callback?: AnimationCallback
	duration?: Duration | number
	easing?: Easing
	repeat?: number
}

export interface HandleAnimatedTimingOptions extends Omit<AnimatedTimingOptions, 'sharedValue' | 'callback'> {
	token: Token
}

export interface UseAnimatedTimingOptions {
	disabledAnimated?: boolean
	token: Token
}

export type AnimatedTiming = (
	options?: AnimatedTimingOptions
) => (sharedValue: SharedValue<number>) => (toValue: number) => void

export interface UseWindowDimensionsOptions {
	changeEventThrottle?: number
}
