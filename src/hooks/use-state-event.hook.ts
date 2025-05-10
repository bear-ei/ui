import {useCallback, useMemo} from 'react'
import type {
	GestureResponderEvent,
	LayoutChangeEvent,
	MouseEvent,
	NativeSyntheticEvent,
	TargetedEvent
} from 'react-native'
import {Platform} from 'react-native'
import type {State} from '../components'
import {createHandler} from '../utils'
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
		if (disabled && eventName !== 'layout') {
			return
		}

		onStateEventChange?.({eventName})(state)(event)
		callback?.()
	}

const handlePressInEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onPressIn?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onPressIn?.(event), eventName: 'pressIn'})('pressIn')(event)

const handlePressEvent =
	({interactionHandlers, mobileDevice}: HandleStateEventOptions) =>
	(onPress?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onPress?.(event), eventName: 'press'})(
			mobileDevice ? 'enabled' : 'hovered'
		)(event)

const handleLongPressEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onLongPress?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onLongPress?.(event), eventName: 'longPress'})('longPressIn')(
			event
		)

const handlePressOutEvent =
	({interactionHandlers, mobileDevice}: HandleStateEventOptions) =>
	(onPressOut?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		interactionHandlers({callback: () => onPressOut?.(event), eventName: 'pressOut'})(
			mobileDevice ? 'enabled' : 'hovered'
		)(event)

const handleHoverIntEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onHoverIn?: (event: MouseEvent) => void) =>
	(event: MouseEvent) =>
		interactionHandlers({callback: () => onHoverIn?.(event), eventName: 'hoverIn'})('hovered')(event)

const handleHoverOutEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onHoverOut?: (event: MouseEvent) => void) =>
	(event: MouseEvent) =>
		interactionHandlers({callback: () => onHoverOut?.(event), eventName: 'hoverOut'})('enabled')(event)

const handleFocusEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
	(event: NativeSyntheticEvent<TargetedEvent>) =>
		interactionHandlers({callback: () => onFocus?.(event), eventName: 'focus'})('focused')(event)

const handleBlurEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
	(event: NativeSyntheticEvent<TargetedEvent>) =>
		interactionHandlers({callback: () => onBlur?.(event), eventName: 'blur'})('enabled')(event)

const handleLayoutEvent =
	({interactionHandlers}: HandleStateEventOptions) =>
	(onLayout?: (event: LayoutChangeEvent) => void) =>
	(event: LayoutChangeEvent) =>
		interactionHandlers({callback: () => onLayout?.(event), eventName: 'layout'})('enabled')(event)

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
				disabled ? 'disabled' : state
			)(event),
		[disabled, onStateEventChange]
	)

	const handleBlur = useMemo(
		() => createHandler(handleBlurEvent({interactionHandlers})(onBlur)),
		[interactionHandlers, onBlur]
	)

	const handleFocus = useMemo(
		() => createHandler(handleFocusEvent({interactionHandlers})(onFocus)),
		[interactionHandlers, onFocus]
	)

	const handleHoverIn = useMemo(
		() => createHandler(handleHoverIntEvent({interactionHandlers})(onHoverIn)),
		[interactionHandlers, onHoverIn]
	)

	const handleHoverOut = useMemo(
		() => createHandler(handleHoverOutEvent({interactionHandlers})(onHoverOut)),
		[interactionHandlers, onHoverOut]
	)

	const handleLayout = useMemo(
		() => createHandler(handleLayoutEvent({interactionHandlers})(onLayout)),
		[interactionHandlers, onLayout]
	)

	const handleLongPress = useMemo(
		() => createHandler(handleLongPressEvent({interactionHandlers})(onLongPress)),
		[interactionHandlers, onLongPress]
	)

	const handlePress = useMemo(
		() => createHandler(handlePressEvent({interactionHandlers, mobileDevice: isMobileDevice})(onPress)),
		[interactionHandlers, isMobileDevice, onPress]
	)

	const handlePressIn = useMemo(
		() => createHandler(handlePressInEvent({interactionHandlers})(onPressIn)),
		[interactionHandlers, onPressIn]
	)

	const handlePressOut = useMemo(
		() =>
			createHandler(
				handlePressOutEvent({interactionHandlers, mobileDevice: isMobileDevice})(onPressOut)
			),
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
