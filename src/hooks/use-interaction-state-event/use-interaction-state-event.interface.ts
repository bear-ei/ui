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

import type {EventName, InteractionState} from '../../constants'

export interface HandleInteractionStateChangeOptions<T = InteractionEvent> extends Pick<
	UseInteractionStateEventOptions<T>,
	'disabled' | 'onInteractionStateChange'
> {
	eventName: EventName
	interactionState?: InteractionState
	onEvent?: {bivarianceHack(event: T): void}['bivarianceHack'] | null
}

/**
 * Union of all event types that flow through the interaction state machine.
 * The union exists because RN and RNW use different event types for the
 * same logical event (e.g. onPress fires GestureResponderEvent on native
 * and NativeSyntheticEvent<NativeTouchEvent> on web).
 */
export type InteractionEvent =
	GestureResponderEvent | LayoutChangeEvent | MouseEvent | NativeSyntheticEvent<TargetedEvent>
export type InteractionStateChangeHandler<T = InteractionEvent> = (
	event: T,
	interactionState: InteractionState,
	options: HandleInteractionStateChangeOptions<T>
) => void

export interface UseInteractionStateEventOptions<T = InteractionEvent> extends Omit<
	InteractionHandlers,
	'onBlur' | 'onFocus'
> {
	disabled?: boolean
	onBlur?: ((e: BlurEvent) => void) | ((event: NativeSyntheticEvent<TargetedEvent>) => void) | null
	onFocus?: ((e: FocusEvent) => void) | ((event: NativeSyntheticEvent<TargetedEvent>) => void) | null
	onInteractionStateChange?: InteractionStateChangeHandler<T>
}

export interface HandleInteractionStateOptions<T = InteractionEvent> {
	dispatchInteractionState: (
		event: T,
		interactionState: InteractionState,
		options: HandleInteractionStateChangeOptions<T>
	) => void
	isMobileDevice?: boolean
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
