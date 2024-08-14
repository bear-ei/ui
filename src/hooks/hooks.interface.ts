import {Duration, Easing, Token} from '@bearei/ui-token'
import {
    GestureResponderEvent,
    LayoutChangeEvent,
    MouseEvent,
    NativeSyntheticEvent,
    PressableProps,
    ScrollViewProps,
    TargetedEvent
} from 'react-native'
import {AnimatableValue, AnimationCallback, SharedValue, WithTimingConfig} from 'react-native-reanimated'
import {EventName, State} from '../components/Common'

export type StateEvent = GestureResponderEvent | LayoutChangeEvent | MouseEvent | NativeSyntheticEvent<TargetedEvent>
export type OnStateEvent = {
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

export interface UseHandleStateEventOptions extends Partial<PressableProps & OnStateEvent> {
    disabled?: boolean
    onStateEventChange?: (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) => void
}

export interface HandleStateEventChangeOptions
    extends Pick<UseHandleStateEventOptions, 'disabled' | 'onStateEventChange'> {
    callback?: () => void
    eventName?: EventName
    state?: State
}

export type OnStateEventChangeOptions = HandleStateEventChangeOptions
export interface HandleStateEventOptions {
    onStateEvent: (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) => void
    mobileDevice?: boolean
}

export type WindowSize = 'compact' | 'medium' | 'expanded' | 'large' | 'extraLarge'
export type UseDesktopScrollEventOptions = Pick<ScrollViewProps, 'onScroll' | 'onMomentumScrollEnd'>
export interface HandleScrollOptions extends Pick<ScrollViewProps, 'onScroll' | 'onMomentumScrollEnd'> {
    momentumScrollEndTimer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
}

export interface AnimatedTimingOptions extends Omit<WithTimingConfig, 'duration' | 'easing'> {
    duration?: Duration
    easing?: Easing
    repeat?: number
    callback?: AnimationCallback
}

export interface ProcessAnimatedTimingOptions extends Omit<AnimatedTimingOptions, 'sharedValue' | 'callback'> {
    token: Token
}

export type AnimatedTiming = (
    options?: AnimatedTimingOptions
) => (sharedValue: SharedValue<AnimatableValue>) => (toValue: number) => void

export interface UseWindowDimensionsOptions {
    changeEventThrottle?: number
    inspectionPlatform?: boolean
}
