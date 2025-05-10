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
import {createHandler} from '../utils'
import type {
	GestureResponderEventHandler,
	HandleStateEventChangeOptions,
	HandleStateEventOptions,
	LayoutEventHandler,
	MouseEventHandler,
	StateEvent,
	TargetedEventHandler,
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
	onBlur,
	onFocus,
	onHoverIn,
	onHoverOut,
	onLayout,
	onLongPress,
	onPress,
	onPressIn,
	onPressOut,
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

	const handleBlur = useMemo(
		() => createHandler<TargetedEventHandler>(handleBlurEvent({interactionHandlers})(onBlur))()(),
		[interactionHandlers, onBlur]
	)

	const handleFocus = useMemo(
		() => createHandler<TargetedEventHandler>(handleFocusEvent({interactionHandlers})(onFocus))()(),
		[interactionHandlers, onFocus]
	)

	const handleHoverIn = useMemo(
		() => createHandler<MouseEventHandler>(handleHoverIntEvent({interactionHandlers})(onHoverIn))()(),
		[interactionHandlers, onHoverIn]
	)

	const handleHoverOut = useMemo(
		() => createHandler<MouseEventHandler>(handleHoverOutEvent({interactionHandlers})(onHoverOut))()(),
		[interactionHandlers, onHoverOut]
	)

	const handleLayout = useMemo(
		() => createHandler<LayoutEventHandler>(handleLayoutEvent({interactionHandlers})(onLayout))()(),
		[interactionHandlers, onLayout]
	)

	const handleLongPress = useMemo(
		() =>
			createHandler<GestureResponderEventHandler>(
				handleLongPressEvent({interactionHandlers})(onLongPress)
			)()(),
		[interactionHandlers, onLongPress]
	)

	const handlePress = useMemo(
		() =>
			createHandler<GestureResponderEventHandler>(
				handlePressEvent({interactionHandlers, mobileDevice: isMobileDevice})(onPress)
			)()(),
		[interactionHandlers, isMobileDevice, onPress]
	)

	const handlePressIn = useMemo(
		() =>
			createHandler<GestureResponderEventHandler>(
				handlePressInEvent({interactionHandlers})(onPressIn)
			)()(),
		[interactionHandlers, onPressIn]
	)

	const handlePressOut = useMemo(
		() =>
			createHandler<GestureResponderEventHandler>(
				handlePressOutEvent({interactionHandlers, mobileDevice: isMobileDevice})(onPressOut)
			)()(),
		[interactionHandlers, isMobileDevice, onPressOut]
	)

	return {
		mobileDevice: isMobileDevice,
		onBlur: handleBlur,
		onFocus: handleFocus,
		onHoverIn: handleHoverIn,
		onHoverOut: handleHoverOut,
		onLayout: handleLayout,
		onLongPress: handleLongPress,
		onPress: handlePress,
		onPressIn: handlePressIn,
		onPressOut: handlePressOut
	}
}
