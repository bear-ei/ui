import {useCallback, useMemo} from 'react'
import {Platform} from 'react-native'
import {STATE, type State} from '../../components'
import {createStableHandler} from '../../utils'
import {
	handleBlurEvent,
	handleFocusEvent,
	handleHoverIntEvent,
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

export const useInteractionStateEvent = ({
	disabled,
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
	const isMobileDevice = ['ios', 'android'].includes(Platform.OS)
	const interactionHandlers = useCallback(
		(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
			handleStateEventChange({...options, disabled, onStateEventChange})(
				disabled ? STATE.DISABLED : state
			)(event),
		[disabled, onStateEventChange]
	)

	const onBlur = useMemo(
		() => createStableHandler(handleBlurEvent({interactionHandlers})(rawOnBlur))(),
		[interactionHandlers, rawOnBlur]
	)

	const onFocus = useMemo(
		() => createStableHandler(handleFocusEvent({interactionHandlers})(rawOnFocus))(),
		[interactionHandlers, rawOnFocus]
	)

	const onHoverIn = useMemo(
		() => createStableHandler(handleHoverIntEvent({interactionHandlers})(rawOnHoverIn))(),
		[interactionHandlers, rawOnHoverIn]
	)

	const onHoverOut = useMemo(
		() => createStableHandler(handleHoverOutEvent({interactionHandlers})(rawOnHoverOut))(),
		[interactionHandlers, rawOnHoverOut]
	)

	const onLayout = useMemo(
		() => createStableHandler(handleLayoutEvent({interactionHandlers})(rawOnLayout))(),
		[interactionHandlers, rawOnLayout]
	)

	const onLongPress = useMemo(
		() => createStableHandler(handleLongPressEvent({interactionHandlers})(rawOnLongPress))(),
		[interactionHandlers, rawOnLongPress]
	)

	const onPress = useMemo(
		() =>
			createStableHandler(
				handlePressEvent({interactionHandlers, mobileDevice: isMobileDevice})(rawOnPress)
			)(),
		[interactionHandlers, isMobileDevice, rawOnPress]
	)

	const onPressIn = useMemo(
		() => createStableHandler(handlePressInEvent({interactionHandlers})(rawOnPressIn))(),
		[interactionHandlers, rawOnPressIn]
	)

	const onPressOut = useMemo(
		() =>
			createStableHandler(
				handlePressOutEvent({interactionHandlers, mobileDevice: isMobileDevice})(rawOnPressOut)
			)(),
		[interactionHandlers, isMobileDevice, rawOnPressOut]
	)

	return {
		mobileDevice: isMobileDevice,
		onBlur,
		onFocus,
		onHoverIn,
		onHoverOut,
		onLayout,
		onLongPress,
		onPress,
		onPressIn,
		onPressOut
	}
}
