import {useCallback, useMemo} from 'react'
import type {
	GestureResponderEvent,
	LayoutChangeEvent,
	MouseEvent,
	NativeSyntheticEvent,
	TargetedEvent
} from 'react-native'
import {Platform} from 'react-native'
import {EVENT_NAME, STATE, type State} from '../components'
import {createHandlerFinal} from '../utils'
import type {
	HandleStateEventChangeOptions,
	HandleStateEventOptions,
	StateEvent,
	UseHandleStateEventOptions
} from './hooks.interface'

const handleStateEventChange =
	({callback, disabled, eventName, onStateEventChange}: HandleStateEventChangeOptions) =>
	(state: State) =>
	(event: StateEvent) => {
		if (disabled && eventName !== EVENT_NAME.LAYOUT) {
			return
		}

		onStateEventChange?.({eventName})(state)(event)
		callback?.()
	}

const handlePressInEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onPressIn?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onPressIn?.(event), eventName: EVENT_NAME.PRESS_IN})(
			STATE.PRESS_IN
		)(event)

const handlePressEvent =
	({interactionHandlers, mobileDevice}: HandleStateEventOptions) =>
	(onPress?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onPress?.(event), eventName: EVENT_NAME.PRESS})(
			mobileDevice ? STATE.ENABLED : STATE.HOVERED
		)(event)

const handleLongPressEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onLongPress?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onLongPress?.(event), eventName: EVENT_NAME.LONG_PRESS})(
			STATE.LONG_PRESS_IN
		)(event)

const handlePressOutEvent =
	({interactionHandlers, mobileDevice}: HandleStateEventOptions) =>
	(onPressOut?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onPressOut?.(event), eventName: EVENT_NAME.PRESS_OUT})(
			mobileDevice ? STATE.ENABLED : STATE.HOVERED
		)(event)

const handleHoverIntEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onHoverIn?: (event: MouseEvent) => void) =>
	(event: MouseEvent) =>
		interactionHandlers({callback: () => onHoverIn?.(event), eventName: EVENT_NAME.HOVER_IN})(
			STATE.HOVERED
		)(event)

const handleHoverOutEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onHoverOut?: (event: MouseEvent) => void) =>
	(event: MouseEvent) =>
		interactionHandlers({callback: () => onHoverOut?.(event), eventName: EVENT_NAME.HOVER_OUT})(
			STATE.ENABLED
		)(event)

const handleFocusEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
	(event: NativeSyntheticEvent<TargetedEvent>) =>
		interactionHandlers({callback: () => onFocus?.(event), eventName: EVENT_NAME.FOCUS})(STATE.FOCUSED)(
			event
		)

const handleBlurEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
	(event: NativeSyntheticEvent<TargetedEvent>) =>
		interactionHandlers({callback: () => onBlur?.(event), eventName: EVENT_NAME.BLUR})(STATE.ENABLED)(event)

const handleLayoutEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onLayout?: (event: LayoutChangeEvent) => void) =>
	(event: LayoutChangeEvent) =>
		interactionHandlers({callback: () => onLayout?.(event), eventName: EVENT_NAME.LAYOUT})(STATE.ENABLED)(
			event
		)

export const useStateEvent = ({
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
		() => createHandlerFinal(handleBlurEvent({interactionHandlers})(rawOnBlur))(),
		[interactionHandlers, rawOnBlur]
	)

	const onFocus = useMemo(
		() => createHandlerFinal(handleFocusEvent({interactionHandlers})(rawOnFocus))(),
		[interactionHandlers, rawOnFocus]
	)

	const onHoverIn = useMemo(
		() => createHandlerFinal(handleHoverIntEvent({interactionHandlers})(rawOnHoverIn))(),
		[interactionHandlers, rawOnHoverIn]
	)

	const onHoverOut = useMemo(
		() => createHandlerFinal(handleHoverOutEvent({interactionHandlers})(rawOnHoverOut))(),
		[interactionHandlers, rawOnHoverOut]
	)

	const onLayout = useMemo(
		() => createHandlerFinal(handleLayoutEvent({interactionHandlers})(rawOnLayout))(),
		[interactionHandlers, rawOnLayout]
	)

	const onLongPress = useMemo(
		() => createHandlerFinal(handleLongPressEvent({interactionHandlers})(rawOnLongPress))(),
		[interactionHandlers, rawOnLongPress]
	)

	const onPress = useMemo(
		() =>
			createHandlerFinal(
				handlePressEvent({interactionHandlers, mobileDevice: isMobileDevice})(rawOnPress)
			)(),
		[interactionHandlers, isMobileDevice, rawOnPress]
	)

	const onPressIn = useMemo(
		() => createHandlerFinal(handlePressInEvent({interactionHandlers})(rawOnPressIn))(),
		[interactionHandlers, rawOnPressIn]
	)

	const onPressOut = useMemo(
		() =>
			createHandlerFinal(
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
