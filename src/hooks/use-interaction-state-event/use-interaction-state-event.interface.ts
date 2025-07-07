import type {
	GestureResponderEvent,
	LayoutChangeEvent,
	MouseEvent,
	NativeSyntheticEvent,
	TargetedEvent,
	TextInputContentSizeChangeEventData
} from 'react-native'
import type {EventName, State} from '../../components'

export type StateEvent =
	| GestureResponderEvent
	| LayoutChangeEvent
	| MouseEvent
	| NativeSyntheticEvent<TargetedEvent>
	| NativeSyntheticEvent<TextInputContentSizeChangeEventData>

export interface UseHandleStateEventOptions extends InteractionHandlers {
	disabled?: boolean
	layoutEventDelay?: number
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
