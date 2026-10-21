import type {BlurEvent, FocusEvent, GestureResponderEvent, LayoutChangeEvent, MouseEvent} from 'react-native'

import type {
	HandleStateEventChangeOptions,
	HandleStateEventOptions,
	StateEvent,
	UseHandleStateEventOptions
} from './use-interaction-state-event.interface'

import {EVENT_NAME, STATE, type State} from '../../constants'

/**
 * Wrap a handler to stop event propagation.
 *
 * ⚠️ Applied to ALL interaction events. This is intentional —
 * nested touchables (e.g. Button inside Popover) should only
 * respond at the innermost level. If a parent needs to observe
 * child events, this wrapper must not be used for that event.
 *
 * Identity stability is the caller's responsibility (via useMemo).
 */
export const createPropagationStoppedHandler =
	<T extends StateEvent>(handler: (event: T) => void) =>
	(event: T) => {
		// RNW's event objects do not always implement stopPropagation,
		// despite the React.BaseSyntheticEvent type claiming it exists.
		// Local cast keeps the workaround from leaking into StateEvent.
		;(event as {stopPropagation?: () => void}).stopPropagation?.()

		return handler(event)
	}

export const handleStateEventChange = <T>(
	event: T,
	state: State,
	{callback, disabled, eventName, onStateEventChange}: HandleStateEventChangeOptions<T>
) => {
	onStateEventChange?.(event, disabled && eventName !== EVENT_NAME.LAYOUT ? STATE.DISABLED : state, {eventName})

	if (!disabled || eventName === EVENT_NAME.LAYOUT) {
		callback?.(event)
	}
}

export const handlePressInEvent =
	(
		{interactionHandlers}: HandleStateEventOptions<GestureResponderEvent>,
		onPressIn?: UseHandleStateEventOptions['onPressIn']
	) =>
	(event: GestureResponderEvent) =>
		interactionHandlers(event, STATE.PRESS_IN, {callback: onPressIn, eventName: EVENT_NAME.PRESS_IN})

export const handlePressEvent =
	(
		{interactionHandlers, mobileDevice}: HandleStateEventOptions<GestureResponderEvent>,
		onPress?: UseHandleStateEventOptions['onPress']
	) =>
	(event: GestureResponderEvent) =>
		interactionHandlers(event, mobileDevice ? STATE.ENABLED : STATE.HOVERED, {
			callback: onPress,
			eventName: EVENT_NAME.PRESS
		})

export const handleLongPressEvent =
	(
		{interactionHandlers}: HandleStateEventOptions<GestureResponderEvent>,
		onLongPress?: UseHandleStateEventOptions['onLongPress']
	) =>
	(event: GestureResponderEvent) =>
		interactionHandlers(event, STATE.LONG_PRESS, {
			callback: onLongPress,
			eventName: EVENT_NAME.LONG_PRESS
		})

export const handlePressOutEvent =
	(
		{interactionHandlers, mobileDevice}: HandleStateEventOptions<GestureResponderEvent>,
		onPressOut?: UseHandleStateEventOptions['onPressOut']
	) =>
	(event: GestureResponderEvent) =>
		interactionHandlers(event, mobileDevice ? STATE.ENABLED : STATE.HOVERED, {
			callback: onPressOut,
			eventName: EVENT_NAME.PRESS_OUT
		})

export const handleHoverInEvent =
	({interactionHandlers}: HandleStateEventOptions<MouseEvent>, onHoverIn?: UseHandleStateEventOptions['onHoverIn']) =>
	(event: MouseEvent) =>
		interactionHandlers(event, STATE.HOVERED, {callback: onHoverIn, eventName: EVENT_NAME.HOVER_IN})

export const handleHoverOutEvent =
	(
		{interactionHandlers}: HandleStateEventOptions<MouseEvent>,
		onHoverOut?: UseHandleStateEventOptions['onHoverOut']
	) =>
	(event: MouseEvent) =>
		interactionHandlers(event, STATE.ENABLED, {
			callback: onHoverOut,
			eventName: EVENT_NAME.HOVER_OUT
		})

export const handleFocusEvent =
	({interactionHandlers}: HandleStateEventOptions<FocusEvent>, onFocus?: UseHandleStateEventOptions['onFocus']) =>
	(event: FocusEvent) =>
		interactionHandlers(event, STATE.FOCUSED, {callback: onFocus, eventName: EVENT_NAME.FOCUS})

export const handleBlurEvent =
	({interactionHandlers}: HandleStateEventOptions<BlurEvent>, onBlur?: UseHandleStateEventOptions['onBlur']) =>
	(event: BlurEvent) =>
		interactionHandlers(event, STATE.ENABLED, {callback: onBlur, eventName: EVENT_NAME.BLUR})

export const handleLayoutEvent =
	(
		{interactionHandlers}: HandleStateEventOptions<LayoutChangeEvent>,
		onLayout?: UseHandleStateEventOptions['onLayout']
	) =>
	(event: LayoutChangeEvent) =>
		interactionHandlers(event, STATE.ENABLED, {callback: onLayout, eventName: EVENT_NAME.LAYOUT})
