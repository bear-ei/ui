import {EventName, State} from '@/constants'
import type {
        GestureResponderEvent,
        LayoutChangeEvent,
        MouseEvent,
        NativeSyntheticEvent,
        PressableProps,
        TargetedEvent
} from 'react-native'

export type StateEvent = GestureResponderEvent | LayoutChangeEvent | MouseEvent | NativeSyntheticEvent<TargetedEvent>
export interface UseHandleStateEventOptions extends InteractionHandlers {
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

export type InteractionHandlers = Pick<
        PressableProps,
        | 'onBlur'
        | 'onFocus'
        | 'onHoverIn'
        | 'onHoverOut'
        | 'onLayout'
        | 'onLongPress'
        | 'onPress'
        | 'onPressIn'
        | 'onPressOut'
>
