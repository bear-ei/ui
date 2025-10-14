import {EventName, State} from '@/constants'
import type {
        BlurEvent,
        FocusEvent,
        GestureResponderEvent,
        LayoutChangeEvent,
        MouseEvent,
        NativeSyntheticEvent,
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

export interface InteractionHandlers
        extends Pick<
                PressableProps,
                'onHoverIn' | 'onHoverOut' | 'onLayout' | 'onLongPress' | 'onPress' | 'onPressIn' | 'onPressOut'
        > {
        onBlur?: ((e: BlurEvent) => void) | ((event: NativeSyntheticEvent<TargetedEvent>) => void)
        onFocus?: ((e: FocusEvent) => void) | ((event: NativeSyntheticEvent<TargetedEvent>) => void)
}
