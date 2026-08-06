import type {EventName, State} from '@/constants'
import type {
    BlurEvent,
    FocusEvent,
    GestureResponderEvent,
    LayoutChangeEvent,
    MouseEvent,
    NativeSyntheticEvent,
    NativeTouchEvent,
    PressableProps,
    TargetedEvent
} from 'react-native'

export type StateEvent = GestureResponderEvent | LayoutChangeEvent | MouseEvent | NativeSyntheticEvent<TargetedEvent>
export interface UseHandleStateEventOptions extends Omit<InteractionHandlers, 'onBlur' | 'onFocus'> {
    disabled?: boolean
    onStateEventChange?: (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) => void
    onBlur?: ((e: BlurEvent) => void) | ((event: NativeSyntheticEvent<TargetedEvent>) => void) | null
    onFocus?: ((e: FocusEvent) => void) | ((event: NativeSyntheticEvent<TargetedEvent>) => void) | null
}

export interface HandleStateEventChangeOptions extends Pick<
    UseHandleStateEventOptions,
    'disabled' | 'onStateEventChange'
> {
    callback?: () => void
    eventName?: EventName
    state?: State
}

export interface HandleStateEventOptions {
    mobileDevice?: boolean
    interactionHandlers: (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) => void
}

export interface InteractionHandlers extends Pick<
    PressableProps,
    'onHoverIn' | 'onHoverOut' | 'onLayout' | 'onLongPress'
> {
    onBlur?: ((event: BlurEvent) => void) | ((event: NativeSyntheticEvent<TargetedEvent>) => void)
    onFocus?: ((event: FocusEvent) => void) | ((event: NativeSyntheticEvent<TargetedEvent>) => void)
    onPress?: ((event: NativeSyntheticEvent<NativeTouchEvent>) => void) | ((event: GestureResponderEvent) => void)
    onPressIn?: ((event: NativeSyntheticEvent<NativeTouchEvent>) => void) | ((event: GestureResponderEvent) => void)
    onPressOut?: ((event: NativeSyntheticEvent<NativeTouchEvent>) => void) | ((event: GestureResponderEvent) => void)
}
