import {EventName, State} from '@/constants'
import type {
        GestureResponderEvent,
        LayoutChangeEvent,
        MouseEvent,
        NativeSyntheticEvent,
        TargetedEvent,
        TextInputContentSizeChangeEvent
} from 'react-native'

export type StateEvent =
        | GestureResponderEvent
        | LayoutChangeEvent
        | MouseEvent
        | NativeSyntheticEvent<TargetedEvent>
        | NativeSyntheticEvent<TextInputContentSizeChangeEvent>

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
