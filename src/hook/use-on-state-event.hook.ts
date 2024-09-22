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

const processStateEventChange =
    ({callback, disabled, eventName, onStateEventChange}: ProcessStateEventChangeOptions) =>
    (state: State) =>
    (event: StateEvent) => {
        if (disabled) {
            return
        }

        onStateEventChange?.({eventName})(state)(event)
        callback?.()
    }

const processPressInEvent =
    ({onStateEvent}: ProcessStateEventOptions) =>
    (onPressIn?: (event: GestureResponderEvent) => void) =>
    (event: GestureResponderEvent) =>
        onStateEvent({callback: () => onPressIn?.(event), eventName: 'pressIn'})('pressIn')(event)

const processPressEvent =
    ({onStateEvent, mobileDevice}: ProcessStateEventOptions) =>
    (onPress?: (event: GestureResponderEvent) => void) =>
    (event: GestureResponderEvent) =>
        onStateEvent({
            callback: () => onPress?.(event),
            eventName: 'press'
        })(mobileDevice ? 'enabled' : 'hovered')(event)

const processLongPressEvent =
    ({onStateEvent}: ProcessStateEventOptions) =>
    (onLongPress?: (event: GestureResponderEvent) => void) =>
    (event: GestureResponderEvent) =>
        onStateEvent({callback: () => onLongPress?.(event), eventName: 'longPress'})('longPressIn')(event)

const processPressOutEvent =
    ({onStateEvent, mobileDevice}: ProcessStateEventOptions) =>
    (onPressOut?: (event: GestureResponderEvent) => void) =>
    (event: GestureResponderEvent) =>
        onStateEvent({
            callback: () => onPressOut?.(event),
            eventName: 'pressOut'
        })(mobileDevice ? 'enabled' : 'hovered')(event)

const processHoverIntEvent =
    ({onStateEvent}: ProcessStateEventOptions) =>
    (onHoverIn?: (event: MouseEvent) => void) =>
    (event: MouseEvent) =>
        onStateEvent({callback: () => onHoverIn?.(event), eventName: 'hoverIn'})('hovered')(event)

const processHoverOutEvent =
    ({onStateEvent}: ProcessStateEventOptions) =>
    (onHoverOut?: (event: MouseEvent) => void) =>
    (event: MouseEvent) =>
        onStateEvent({callback: () => onHoverOut?.(event), eventName: 'hoverOut'})('enabled')(event)

const processFocusEvent =
    ({onStateEvent}: ProcessStateEventOptions) =>
    (onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
    (event: NativeSyntheticEvent<TargetedEvent>) =>
        onStateEvent({callback: () => onFocus?.(event), eventName: 'focus'})('focused')(event)

const processBlurEvent =
    ({onStateEvent}: ProcessStateEventOptions) =>
    (onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
    (event: NativeSyntheticEvent<TargetedEvent>) =>
        onStateEvent({callback: () => onBlur?.(event), eventName: 'blur'})('enabled')(event)

const processLayoutEvent =
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
        processStateEventChange({...options, disabled, onStateEventChange})(disabled ? 'disabled' : state)(event)

    const processBlur = processBlurEvent({onStateEvent})(onBlur)
    const processFocus = processFocusEvent({onStateEvent})(onFocus)
    const processHoverIn = processHoverIntEvent({onStateEvent})(onHoverIn)
    const processHoverOut = processHoverOutEvent({onStateEvent})(onHoverOut)
    const processLayout = processLayoutEvent({onStateEvent})(onLayout)
    const processLongPress = processLongPressEvent({onStateEvent})(onLongPress)
    const processPress = processPressEvent({onStateEvent, mobileDevice})(onPress)
    const processPressIn = processPressInEvent({onStateEvent})(onPressIn)
    const processPressOut = processPressOutEvent({onStateEvent, mobileDevice})(onPressOut)

    return {
        mobileDevice,
        onBlur: processBlur,
        onFocus: processFocus,
        onHoverIn: processHoverIn,
        onHoverOut: processHoverOut,
        onLayout: processLayout,
        onLongPress: processLongPress,
        onPress: processPress,
        onPressIn: processPressIn,
        onPressOut: processPressOut
    }
}
