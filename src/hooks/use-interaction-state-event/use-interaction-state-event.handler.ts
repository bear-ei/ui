import type {BlurEvent, FocusEvent, GestureResponderEvent, LayoutChangeEvent, MouseEvent} from 'react-native'
import {EVENT_NAME, STATE, type State} from '../../constants'
import type {
	HandleStateEventChangeOptions,
	HandleStateEventOptions,
	StateEvent,
	UseHandleStateEventOptions
} from './use-interaction-state-event.interface'

/**
 * Wrap a handler to (a) stop propagation and (b) stabilize identity.
 *
 * ⚠️ stopPropagation is applied to ALL interaction events.
 * This is intentional — nested touchables (e.g. Button inside Popover)
 * should only respond at the innermost level. If a parent needs to
 * observe child events, this wrapper must not be used for that event.
 */
export const createStableEventHandler =
	<T extends StateEvent>(handler: (event: T) => void) =>
	(event: T) => {
		if (event) {
			event.stopPropagation?.()
		}

		return handler(event)
	}

export const handleStateEventChange =
	({callback, disabled, eventName, onStateEventChange}: HandleStateEventChangeOptions) =>
	(state: State) =>
	(event: StateEvent) => {
		onStateEventChange?.({eventName})(disabled && eventName !== EVENT_NAME.LAYOUT ? STATE.DISABLED : state)(event)

		if (!disabled || eventName === EVENT_NAME.LAYOUT) {
			callback?.()
		}
	}

export const handlePressInEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onPressIn?: UseHandleStateEventOptions['onPressIn']) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onPressIn?.(event), eventName: EVENT_NAME.PRESS_IN})(STATE.PRESS_IN)(event)

export const handlePressEvent =
	({interactionHandlers, mobileDevice}: HandleStateEventOptions) =>
	(onPress?: UseHandleStateEventOptions['onPress']) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onPress?.(event), eventName: EVENT_NAME.PRESS})(
			mobileDevice ? STATE.ENABLED : STATE.HOVERED
		)(event)

export const handleLongPressEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onLongPress?: UseHandleStateEventOptions['onLongPress']) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onLongPress?.(event), eventName: EVENT_NAME.LONG_PRESS})(STATE.LONG_PRESS)(
			event
		)

export const handlePressOutEvent =
	({interactionHandlers, mobileDevice}: HandleStateEventOptions) =>
	(onPressOut?: UseHandleStateEventOptions['onPressOut']) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onPressOut?.(event), eventName: EVENT_NAME.PRESS_OUT})(
			mobileDevice ? STATE.ENABLED : STATE.HOVERED
		)(event)

export const handleHoverInEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onHoverIn?: UseHandleStateEventOptions['onHoverIn']) =>
	(event: MouseEvent) =>
		interactionHandlers({callback: () => onHoverIn?.(event), eventName: EVENT_NAME.HOVER_IN})(STATE.HOVERED)(event)

export const handleHoverOutEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onHoverOut?: UseHandleStateEventOptions['onHoverOut']) =>
	(event: MouseEvent) =>
		interactionHandlers({callback: () => onHoverOut?.(event), eventName: EVENT_NAME.HOVER_OUT})(STATE.ENABLED)(
			event
		)

export const handleFocusEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onFocus?: UseHandleStateEventOptions['onFocus']) =>
	(event: FocusEvent) =>
		interactionHandlers({callback: () => onFocus?.(event), eventName: EVENT_NAME.FOCUS})(STATE.FOCUSED)(event)

export const handleBlurEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onBlur?: UseHandleStateEventOptions['onBlur']) =>
	(event: BlurEvent) =>
		interactionHandlers({callback: () => onBlur?.(event), eventName: EVENT_NAME.BLUR})(STATE.ENABLED)(event)

export const handleLayoutEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onLayout?: UseHandleStateEventOptions['onLayout']) =>
	(event: LayoutChangeEvent) =>
		interactionHandlers({callback: () => onLayout?.(event), eventName: EVENT_NAME.LAYOUT})(STATE.ENABLED)(event)
