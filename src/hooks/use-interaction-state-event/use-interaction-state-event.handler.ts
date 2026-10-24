import type {BlurEvent, FocusEvent, GestureResponderEvent, LayoutChangeEvent, MouseEvent} from 'react-native'

import type {
	HandleInteractionStateChangeOptions,
	HandleInteractionStateOptions,
	InteractionEvent,
	UseInteractionStateEventOptions
} from './use-interaction-state-event.interface'

import {EVENT_NAME, INTERACTION_STATE, type InteractionState} from '../../constants'

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
	<T extends InteractionEvent>(handler: (event: T) => void) =>
	(event: T) => {
		// RNW's event objects do not always implement stopPropagation,
		// despite the React.BaseSyntheticEvent type claiming it exists.
		// Local cast keeps the workaround from leaking into InteractionEvent.
		;(event as {stopPropagation?: () => void}).stopPropagation?.()

		return handler(event)
	}

export const handleInteractionStateChange = <T>(
	event: T,
	interactionState: InteractionState,
	{disabled, eventName, onEvent, onInteractionStateChange}: HandleInteractionStateChangeOptions<T>
) => {
	onInteractionStateChange?.(
		event,
		disabled && eventName !== EVENT_NAME.LAYOUT ? INTERACTION_STATE.DISABLED : interactionState,
		{
			eventName
		}
	)

	if (!disabled || eventName === EVENT_NAME.LAYOUT) {
		onEvent?.(event)
	}
}

export const handlePressInEvent =
	(
		{dispatchInteractionState}: HandleInteractionStateOptions<GestureResponderEvent>,
		onPressIn?: UseInteractionStateEventOptions['onPressIn']
	) =>
	(event: GestureResponderEvent) =>
		dispatchInteractionState(event, INTERACTION_STATE.PRESS_IN, {
			eventName: EVENT_NAME.PRESS_IN,
			onEvent: onPressIn
		})

export const handlePressEvent =
	(
		{dispatchInteractionState, isMobileDevice}: HandleInteractionStateOptions<GestureResponderEvent>,
		onPress?: UseInteractionStateEventOptions['onPress']
	) =>
	(event: GestureResponderEvent) =>
		dispatchInteractionState(event, isMobileDevice ? INTERACTION_STATE.ENABLED : INTERACTION_STATE.HOVERED, {
			eventName: EVENT_NAME.PRESS,
			onEvent: onPress
		})

export const handleLongPressEvent =
	(
		{dispatchInteractionState}: HandleInteractionStateOptions<GestureResponderEvent>,
		onLongPress?: UseInteractionStateEventOptions['onLongPress']
	) =>
	(event: GestureResponderEvent) =>
		dispatchInteractionState(event, INTERACTION_STATE.LONG_PRESS, {
			eventName: EVENT_NAME.LONG_PRESS,
			onEvent: onLongPress
		})

export const handlePressOutEvent =
	(
		{dispatchInteractionState, isMobileDevice}: HandleInteractionStateOptions<GestureResponderEvent>,
		onPressOut?: UseInteractionStateEventOptions['onPressOut']
	) =>
	(event: GestureResponderEvent) =>
		dispatchInteractionState(event, isMobileDevice ? INTERACTION_STATE.ENABLED : INTERACTION_STATE.HOVERED, {
			eventName: EVENT_NAME.PRESS_OUT,
			onEvent: onPressOut
		})

export const handleHoverInEvent =
	(
		{dispatchInteractionState}: HandleInteractionStateOptions<MouseEvent>,
		onHoverIn?: UseInteractionStateEventOptions['onHoverIn']
	) =>
	(event: MouseEvent) =>
		dispatchInteractionState(event, INTERACTION_STATE.HOVERED, {eventName: EVENT_NAME.HOVER_IN, onEvent: onHoverIn})

export const handleHoverOutEvent =
	(
		{dispatchInteractionState}: HandleInteractionStateOptions<MouseEvent>,
		onHoverOut?: UseInteractionStateEventOptions['onHoverOut']
	) =>
	(event: MouseEvent) =>
		dispatchInteractionState(event, INTERACTION_STATE.ENABLED, {
			eventName: EVENT_NAME.HOVER_OUT,
			onEvent: onHoverOut
		})

export const handleFocusEvent =
	(
		{dispatchInteractionState}: HandleInteractionStateOptions<FocusEvent>,
		onFocus?: UseInteractionStateEventOptions['onFocus']
	) =>
	(event: FocusEvent) =>
		dispatchInteractionState(event, INTERACTION_STATE.FOCUSED, {eventName: EVENT_NAME.FOCUS, onEvent: onFocus})

export const handleBlurEvent =
	(
		{dispatchInteractionState}: HandleInteractionStateOptions<BlurEvent>,
		onBlur?: UseInteractionStateEventOptions['onBlur']
	) =>
	(event: BlurEvent) =>
		dispatchInteractionState(event, INTERACTION_STATE.ENABLED, {eventName: EVENT_NAME.BLUR, onEvent: onBlur})

export const handleLayoutEvent =
	(
		{dispatchInteractionState}: HandleInteractionStateOptions<LayoutChangeEvent>,
		onLayout?: UseInteractionStateEventOptions['onLayout']
	) =>
	(event: LayoutChangeEvent) =>
		dispatchInteractionState(event, INTERACTION_STATE.ENABLED, {eventName: EVENT_NAME.LAYOUT, onEvent: onLayout})
