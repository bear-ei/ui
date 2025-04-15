import {
	GestureResponderEvent,
	LayoutChangeEvent,
	MouseEvent,
	NativeSyntheticEvent,
	Platform,
	TargetedEvent
} from 'react-native'
import {State} from '../components/Common'
import {
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
	({stateOnEvent}: HandleStateEventOptions) =>
	(onPressIn?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		stateOnEvent({callback: () => onPressIn?.(event), eventName: 'pressIn'})('pressIn')(event)

const handlePressEvent =
	({stateOnEvent, mobileDevice}: HandleStateEventOptions) =>
	(onPress?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		stateOnEvent({callback: () => onPress?.(event), eventName: 'press'})(
			mobileDevice ? 'enabled' : 'hovered'
		)(event)

const handleLongPressEvent =
	({stateOnEvent}: HandleStateEventOptions) =>
	(onLongPress?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		stateOnEvent({callback: () => onLongPress?.(event), eventName: 'longPress'})('longPressIn')(event)

const handlePressOutEvent =
	({stateOnEvent, mobileDevice}: HandleStateEventOptions) =>
	(onPressOut?: (event: GestureResponderEvent) => void) =>
	(event: GestureResponderEvent) =>
		stateOnEvent({callback: () => onPressOut?.(event), eventName: 'pressOut'})(
			mobileDevice ? 'enabled' : 'hovered'
		)(event)

const handleHoverIntEvent =
	({stateOnEvent}: HandleStateEventOptions) =>
	(onHoverIn?: (event: MouseEvent) => void) =>
	(event: MouseEvent) =>
		stateOnEvent({callback: () => onHoverIn?.(event), eventName: 'hoverIn'})('hovered')(event)

const handleHoverOutEvent =
	({stateOnEvent}: HandleStateEventOptions) =>
	(onHoverOut?: (event: MouseEvent) => void) =>
	(event: MouseEvent) =>
		stateOnEvent({callback: () => onHoverOut?.(event), eventName: 'hoverOut'})('enabled')(event)

const handleFocusEvent =
	({stateOnEvent}: HandleStateEventOptions) =>
	(onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
	(event: NativeSyntheticEvent<TargetedEvent>) =>
		stateOnEvent({callback: () => onFocus?.(event), eventName: 'focus'})('focused')(event)

const handleBlurEvent =
	({stateOnEvent}: HandleStateEventOptions) =>
	(onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
	(event: NativeSyntheticEvent<TargetedEvent>) =>
		stateOnEvent({callback: () => onBlur?.(event), eventName: 'blur'})('enabled')(event)

const handleLayoutEvent =
	({stateOnEvent}: HandleStateEventOptions) =>
	(onLayout?: (event: LayoutChangeEvent) => void) =>
	(event: LayoutChangeEvent) =>
		stateOnEvent({callback: () => onLayout?.(event), eventName: 'layout'})('enabled')(event)

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
	const mobileDevice = ['ios', 'android'].includes(Platform.OS)
	const stateOnEvent = (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
		handleStateEventChange({...options, disabled, onStateEventChange})(disabled ? 'disabled' : state)(event)

	const handleBlur = handleBlurEvent({stateOnEvent})(onBlur)
	const handleFocus = handleFocusEvent({stateOnEvent})(onFocus)
	const handleHoverIn = handleHoverIntEvent({stateOnEvent})(onHoverIn)
	const handleHoverOut = handleHoverOutEvent({stateOnEvent})(onHoverOut)
	const handleLayout = handleLayoutEvent({stateOnEvent})(onLayout)
	const handleLongPress = handleLongPressEvent({stateOnEvent})(onLongPress)
	const handlePress = handlePressEvent({stateOnEvent, mobileDevice})(onPress)
	const handlePressIn = handlePressInEvent({stateOnEvent})(onPressIn)
	const handlePressOut = handlePressOutEvent({stateOnEvent, mobileDevice})(onPressOut)

	return {
		mobileDevice,
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
