import {
    GestureResponderEvent,
    LayoutChangeEvent,
    MouseEvent,
    NativeSyntheticEvent,
    Platform,
    TargetedEvent
} from 'react-native'
import {State} from '../component/Common'
import {
    OnStateEventChangeOptions,
    ProcessStateEventChangeOptions,
    ProcessStateEventOptions,
    StateEvent,
    UseProcessStateEventOptions
} from './hook.interface'

const handleStateEventChange =
    ({callback, disabled, eventName, onStateEventChange}: ProcessStateEventChangeOptions) =>
    (state: State) =>
    (event: StateEvent) => {
        if (disabled) {
            return
        }

        onStateEventChange?.({eventName})(state)(event)
        callback?.()
    }

const handlePressInEvent =
    ({onStateEvent}: ProcessStateEventOptions) =>
    (onPressIn?: (event: GestureResponderEvent) => void) =>
    (event: GestureResponderEvent) =>
        onStateEvent({callback: () => onPressIn?.(event), eventName: 'pressIn'})('pressIn')(event)

const handlePressEvent =
    ({onStateEvent, mobileDevice}: ProcessStateEventOptions) =>
    (onPress?: (event: GestureResponderEvent) => void) =>
    (event: GestureResponderEvent) =>
        onStateEvent({
            callback: () => onPress?.(event),
            eventName: 'press'
        })(mobileDevice ? 'enabled' : 'hovered')(event)

const handleLongPressEvent =
    ({onStateEvent}: ProcessStateEventOptions) =>
    (onLongPress?: (event: GestureResponderEvent) => void) =>
    (event: GestureResponderEvent) =>
        onStateEvent({callback: () => onLongPress?.(event), eventName: 'longPress'})('longPressIn')(event)

const handlePressOutEvent =
    ({onStateEvent, mobileDevice}: ProcessStateEventOptions) =>
    (onPressOut?: (event: GestureResponderEvent) => void) =>
    (event: GestureResponderEvent) =>
        onStateEvent({
            callback: () => onPressOut?.(event),
            eventName: 'pressOut'
        })(mobileDevice ? 'enabled' : 'hovered')(event)

const handleHoverIntEvent =
    ({onStateEvent}: ProcessStateEventOptions) =>
    (onHoverIn?: (event: MouseEvent) => void) =>
    (event: MouseEvent) =>
        onStateEvent({callback: () => onHoverIn?.(event), eventName: 'hoverIn'})('hovered')(event)

const handleHoverOutEvent =
    ({onStateEvent}: ProcessStateEventOptions) =>
    (onHoverOut?: (event: MouseEvent) => void) =>
    (event: MouseEvent) =>
        onStateEvent({callback: () => onHoverOut?.(event), eventName: 'hoverOut'})('enabled')(event)

const handleFocusEvent =
    ({onStateEvent}: ProcessStateEventOptions) =>
    (onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
    (event: NativeSyntheticEvent<TargetedEvent>) =>
        onStateEvent({callback: () => onFocus?.(event), eventName: 'focus'})('focused')(event)

const handleBlurEvent =
    ({onStateEvent}: ProcessStateEventOptions) =>
    (onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
    (event: NativeSyntheticEvent<TargetedEvent>) =>
        onStateEvent({callback: () => onBlur?.(event), eventName: 'blur'})('enabled')(event)

const handleLayoutEvent =
    ({onStateEvent}: ProcessStateEventOptions) =>
    (onLayout?: (event: LayoutChangeEvent) => void) =>
    (event: LayoutChangeEvent) =>
        onStateEvent({callback: () => onLayout?.(event), eventName: 'layout'})('enabled')(event)

export const useOnStateEvent = ({
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
}: UseProcessStateEventOptions) => {
    const mobileDevice = ['ios', 'android'].includes(Platform.OS)
    const onStateEvent = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
        handleStateEventChange({...options, disabled, onStateEventChange})(disabled ? 'disabled' : state)(event)

    const handleBlur = handleBlurEvent({onStateEvent})(onBlur)
    const handleFocus = handleFocusEvent({onStateEvent})(onFocus)
    const handleHoverIn = handleHoverIntEvent({onStateEvent})(onHoverIn)
    const handleHoverOut = handleHoverOutEvent({onStateEvent})(onHoverOut)
    const handleLayout = handleLayoutEvent({onStateEvent})(onLayout)
    const handleLongPress = handleLongPressEvent({onStateEvent})(onLongPress)
    const handlePress = handlePressEvent({onStateEvent, mobileDevice})(onPress)
    const handlePressIn = handlePressInEvent({onStateEvent})(onPressIn)
    const handlePressOut = handlePressOutEvent({onStateEvent, mobileDevice})(onPressOut)

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
