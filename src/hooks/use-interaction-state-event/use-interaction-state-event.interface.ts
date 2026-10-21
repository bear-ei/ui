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

import type {EventName, State} from '../../constants'

export interface HandleStateEventChangeOptions<T = StateEvent> extends Pick<
	UseHandleStateEventOptions<T>,
	'disabled' | 'onStateEventChange'
> {
	callback?: {bivarianceHack(event: T): void}['bivarianceHack'] | null
	eventName: EventName
	state?: State
}

/**
 * Union of all event types that flow through the interaction state machine.
 * The union exists because RN and RNW use different event types for the
 * same logical event (e.g. onPress fires GestureResponderEvent on native
 * and NativeSyntheticEvent<NativeTouchEvent> on web).
 */
export type StateEvent = GestureResponderEvent | LayoutChangeEvent | MouseEvent | NativeSyntheticEvent<TargetedEvent>
export type StateEventChangeHandler<T = StateEvent> = (
	event: T,
	state: State,
	options: HandleStateEventChangeOptions<T>
) => void

export interface UseHandleStateEventOptions<T = StateEvent> extends Omit<InteractionHandlers, 'onBlur' | 'onFocus'> {
	disabled?: boolean
	onBlur?: ((e: BlurEvent) => void) | ((event: NativeSyntheticEvent<TargetedEvent>) => void) | null
	onFocus?: ((e: FocusEvent) => void) | ((event: NativeSyntheticEvent<TargetedEvent>) => void) | null
	onStateEventChange?: StateEventChangeHandler<T>
}

export interface HandleStateEventOptions<T = StateEvent> {
	interactionHandlers: (event: T, state: State, options: HandleStateEventChangeOptions<T>) => void
	mobileDevice?: boolean
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
