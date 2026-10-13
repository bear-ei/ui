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

/**
 * Union of all event types that flow through the interaction state machine.
 * The union exists because RN and RNW use different event types for the
 * same logical event (e.g. onPress fires GestureResponderEvent on native
 * and NativeSyntheticEvent<NativeTouchEvent> on web).
 */
export type StateEvent = GestureResponderEvent | LayoutChangeEvent | MouseEvent | NativeSyntheticEvent<TargetedEvent>
export type StateEventChangeHandler = (
	options: HandleStateEventChangeOptions
) => (state: State) => (event: StateEvent) => void

export interface UseHandleStateEventOptions extends Omit<InteractionHandlers, 'onBlur' | 'onFocus'> {
	disabled?: boolean
	onStateEventChange?: StateEventChangeHandler
	onBlur?: ((e: BlurEvent) => void) | ((event: NativeSyntheticEvent<TargetedEvent>) => void) | null
	onFocus?: ((e: FocusEvent) => void) | ((event: NativeSyntheticEvent<TargetedEvent>) => void) | null
}

export interface HandleStateEventChangeOptions extends Pick<
	UseHandleStateEventOptions,
	'disabled' | 'onStateEventChange'
> {
	callback?: () => void
	eventName: EventName
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
