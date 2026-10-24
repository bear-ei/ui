import {useCallback, useMemo} from 'react'
import {Platform} from 'react-native'

import type {
	HandleInteractionStateChangeOptions,
	InteractionEvent,
	UseInteractionStateEventOptions
} from './use-interaction-state-event.interface'

import {type InteractionState} from '../../constants'
import {
	createPropagationStoppedHandler,
	handleBlurEvent,
	handleFocusEvent,
	handleHoverInEvent,
	handleHoverOutEvent,
	handleLayoutEvent,
	handleLongPressEvent,
	handlePressEvent,
	handlePressInEvent,
	handlePressOutEvent,
	handleInteractionStateChange
} from './use-interaction-state-event.handler'

const IS_MOBILE_DEVICE = Platform.OS === 'ios' || Platform.OS === 'android'
export const useInteractionStateEvent = ({
	disabled = false,
	onBlur: rawOnBlur,
	onFocus: rawOnFocus,
	onHoverIn: rawOnHoverIn,
	onHoverOut: rawOnHoverOut,
	onInteractionStateChange,
	onLayout: rawOnLayout,
	onLongPress: rawOnLongPress,
	onPress: rawOnPress,
	onPressIn: rawOnPressIn,
	onPressOut: rawOnPressOut
}: UseInteractionStateEventOptions) => {
	const dispatchInteractionState = useCallback(
		<T extends InteractionEvent>(
			event: T,
			interactionState: InteractionState,
			options: HandleInteractionStateChangeOptions<T>
		) => handleInteractionStateChange(event, interactionState, {...options, disabled, onInteractionStateChange}),
		[disabled, onInteractionStateChange]
	)

	const onBlur = useMemo(
		() => createPropagationStoppedHandler(handleBlurEvent({dispatchInteractionState}, rawOnBlur)),
		[dispatchInteractionState, rawOnBlur]
	)

	const onFocus = useMemo(
		() => createPropagationStoppedHandler(handleFocusEvent({dispatchInteractionState}, rawOnFocus)),
		[dispatchInteractionState, rawOnFocus]
	)

	const onHoverIn = useMemo(
		() => createPropagationStoppedHandler(handleHoverInEvent({dispatchInteractionState}, rawOnHoverIn)),
		[dispatchInteractionState, rawOnHoverIn]
	)

	const onHoverOut = useMemo(
		() => createPropagationStoppedHandler(handleHoverOutEvent({dispatchInteractionState}, rawOnHoverOut)),
		[dispatchInteractionState, rawOnHoverOut]
	)

	const onLongPress = useMemo(
		() => createPropagationStoppedHandler(handleLongPressEvent({dispatchInteractionState}, rawOnLongPress)),
		[dispatchInteractionState, rawOnLongPress]
	)

	const onPress = useMemo(
		() =>
			createPropagationStoppedHandler(
				handlePressEvent({dispatchInteractionState, isMobileDevice: IS_MOBILE_DEVICE}, rawOnPress)
			),
		[dispatchInteractionState, rawOnPress]
	)

	const onPressIn = useMemo(
		() => createPropagationStoppedHandler(handlePressInEvent({dispatchInteractionState}, rawOnPressIn)),
		[dispatchInteractionState, rawOnPressIn]
	)

	const onPressOut = useMemo(
		() =>
			createPropagationStoppedHandler(
				handlePressOutEvent({dispatchInteractionState, isMobileDevice: IS_MOBILE_DEVICE}, rawOnPressOut)
			),
		[dispatchInteractionState, rawOnPressOut]
	)

	const onLayout = useMemo(
		() => createPropagationStoppedHandler(handleLayoutEvent({dispatchInteractionState}, rawOnLayout)),
		[dispatchInteractionState, rawOnLayout]
	)

	const result = useMemo(
		() => ({
			isMobileDevice: IS_MOBILE_DEVICE,
			onBlur,
			onFocus,
			onHoverIn,
			onHoverOut,
			onLayout,
			onLongPress,
			onPress,
			onPressIn,
			onPressOut
		}),
		[onBlur, onFocus, onHoverIn, onHoverOut, onLayout, onLongPress, onPress, onPressIn, onPressOut]
	)

	return result
}
