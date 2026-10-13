import {useCallback, useMemo} from 'react'
import {Platform} from 'react-native'
import {type State} from '../../constants'
import {
	createStableEventHandler,
	handleBlurEvent,
	handleFocusEvent,
	handleHoverInEvent,
	handleHoverOutEvent,
	handleLayoutEvent,
	handleLongPressEvent,
	handlePressEvent,
	handlePressInEvent,
	handlePressOutEvent,
	handleStateEventChange
} from './use-interaction-state-event.handler'
import type {
	HandleStateEventChangeOptions,
	StateEvent,
	UseHandleStateEventOptions
} from './use-interaction-state-event.interface'

const IS_MOBILE_DEVICE = ['ios', 'android'].includes(Platform.OS)
export const useInteractionStateEvent = ({
	disabled = false,
	onBlur: rawOnBlur,
	onFocus: rawOnFocus,
	onHoverIn: rawOnHoverIn,
	onHoverOut: rawOnHoverOut,
	onLayout: rawOnLayout,
	onLongPress: rawOnLongPress,
	onPress: rawOnPress,
	onPressIn: rawOnPressIn,
	onPressOut: rawOnPressOut,
	onStateEventChange
}: UseHandleStateEventOptions) => {
	const interactionHandlers = useCallback(
		(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
			handleStateEventChange({...options, disabled, onStateEventChange})(state)(event),
		[disabled, onStateEventChange]
	)

	const onBlur = useMemo(
		() => createStableEventHandler(handleBlurEvent({interactionHandlers})(rawOnBlur)),
		[interactionHandlers, rawOnBlur]
	)

	const onFocus = useMemo(
		() => createStableEventHandler(handleFocusEvent({interactionHandlers})(rawOnFocus)),
		[interactionHandlers, rawOnFocus]
	)

	const onHoverIn = useMemo(
		() => createStableEventHandler(handleHoverInEvent({interactionHandlers})(rawOnHoverIn)),
		[interactionHandlers, rawOnHoverIn]
	)

	const onHoverOut = useMemo(
		() => createStableEventHandler(handleHoverOutEvent({interactionHandlers})(rawOnHoverOut)),
		[interactionHandlers, rawOnHoverOut]
	)

	const onLongPress = useMemo(
		() => createStableEventHandler(handleLongPressEvent({interactionHandlers})(rawOnLongPress)),
		[interactionHandlers, rawOnLongPress]
	)

	const onPress = useMemo(
		() =>
			createStableEventHandler(
				handlePressEvent({interactionHandlers, mobileDevice: IS_MOBILE_DEVICE})(rawOnPress)
			),
		[interactionHandlers, rawOnPress]
	)

	const onPressIn = useMemo(
		() => createStableEventHandler(handlePressInEvent({interactionHandlers})(rawOnPressIn)),
		[interactionHandlers, rawOnPressIn]
	)

	const onPressOut = useMemo(
		() =>
			createStableEventHandler(
				handlePressOutEvent({interactionHandlers, mobileDevice: IS_MOBILE_DEVICE})(rawOnPressOut)
			),
		[interactionHandlers, rawOnPressOut]
	)

	const onLayout = useMemo(
		() => createStableEventHandler(handleLayoutEvent({interactionHandlers})(rawOnLayout)),
		[interactionHandlers, rawOnLayout]
	)

	const result = useMemo(
		() => ({
			mobileDevice: IS_MOBILE_DEVICE,
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
