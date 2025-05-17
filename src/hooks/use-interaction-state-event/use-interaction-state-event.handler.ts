import type {
	GestureResponderEvent,
	LayoutChangeEvent,
	MouseEvent,
	NativeSyntheticEvent,
	TargetedEvent
} from 'react-native'
import {EVENT_NAME, STATE, type State} from '../../components'
import type {
	HandleStateEventChangeOptions,
	HandleStateEventOptions,
	StateEvent
} from './use-interaction-state-event.interface'

export const handleStateEventChange =
	({callback, disabled, eventName, onStateEventChange}: HandleStateEventChangeOptions) =>
	(state: State) =>
	(event: StateEvent) => {
		if (disabled && eventName !== EVENT_NAME.LAYOUT) {
			return
		}

		onStateEventChange?.({eventName})(state)(event)
		callback?.()
	}

export const handlePressInEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onPressIn?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onPressIn?.(event), eventName: EVENT_NAME.PRESS_IN})(
			STATE.PRESS_IN
		)(event)

export const handlePressEvent =
	({interactionHandlers, mobileDevice}: HandleStateEventOptions) =>
	(onPress?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onPress?.(event), eventName: EVENT_NAME.PRESS})(
			mobileDevice ? STATE.ENABLED : STATE.HOVERED
		)(event)

export const handleLongPressEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onLongPress?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onLongPress?.(event), eventName: EVENT_NAME.LONG_PRESS})(
			STATE.LONG_PRESS_IN
		)(event)

export const handlePressOutEvent =
	({interactionHandlers, mobileDevice}: HandleStateEventOptions) =>
	(onPressOut?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onPressOut?.(event), eventName: EVENT_NAME.PRESS_OUT})(
			mobileDevice ? STATE.ENABLED : STATE.HOVERED
		)(event)

export const handleHoverIntEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onHoverIn?: (event: MouseEvent) => void) =>
	(event: MouseEvent) =>
		interactionHandlers({callback: () => onHoverIn?.(event), eventName: EVENT_NAME.HOVER_IN})(
			STATE.HOVERED
		)(event)

export const handleHoverOutEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onHoverOut?: (event: MouseEvent) => void) =>
	(event: MouseEvent) =>
		interactionHandlers({callback: () => onHoverOut?.(event), eventName: EVENT_NAME.HOVER_OUT})(
			STATE.ENABLED
		)(event)

export const handleFocusEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
	(event: NativeSyntheticEvent<TargetedEvent>) =>
		interactionHandlers({callback: () => onFocus?.(event), eventName: EVENT_NAME.FOCUS})(STATE.FOCUSED)(
			event
		)

export const handleBlurEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
	(event: NativeSyntheticEvent<TargetedEvent>) =>
		interactionHandlers({callback: () => onBlur?.(event), eventName: EVENT_NAME.BLUR})(STATE.ENABLED)(event)

export const handleLayoutEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onLayout?: (event: LayoutChangeEvent) => void) =>
	(event: LayoutChangeEvent) =>
		interactionHandlers({callback: () => onLayout?.(event), eventName: EVENT_NAME.LAYOUT})(STATE.ENABLED)(
			event
		)
