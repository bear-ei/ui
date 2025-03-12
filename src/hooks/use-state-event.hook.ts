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
        StateEventType,
        UseHandleStateEventOptions
} from './hooks.interface'

const handleStateEventChange =
        ({callback, disabled, eventName, onStateEventChange}: HandleStateEventChangeOptions) =>
        (state: State) =>
        (event: StateEventType) => {
                if (disabled && eventName !== 'layout') {
                        return
                }

                onStateEventChange?.({eventName})(state)(event)
                callback?.()
        }

const handlePressInEvent =
        ({stateEvent}: HandleStateEventOptions) =>
        (onPressIn?: (event: GestureResponderEvent) => void) =>
        (event: GestureResponderEvent) =>
                stateEvent({callback: () => onPressIn?.(event), eventName: 'pressIn'})('pressIn')(event)

const handlePressEvent =
        ({stateEvent, mobileDevice}: HandleStateEventOptions) =>
        (onPress?: (event: GestureResponderEvent) => void) =>
        (event: GestureResponderEvent) =>
                stateEvent({callback: () => onPress?.(event), eventName: 'press'})(
                        mobileDevice ? 'enabled' : 'hovered'
                )(event)

const handleLongPressEvent =
        ({stateEvent}: HandleStateEventOptions) =>
        (onLongPress?: (event: GestureResponderEvent) => void) =>
        (event: GestureResponderEvent) =>
                stateEvent({callback: () => onLongPress?.(event), eventName: 'longPress'})('longPressIn')(event)

const handlePressOutEvent =
        ({stateEvent, mobileDevice}: HandleStateEventOptions) =>
        (onPressOut?: (event: GestureResponderEvent) => void) =>
        (event: GestureResponderEvent) =>
                stateEvent({callback: () => onPressOut?.(event), eventName: 'pressOut'})(
                        mobileDevice ? 'enabled' : 'hovered'
                )(event)

const handleHoverIntEvent =
        ({stateEvent}: HandleStateEventOptions) =>
        (onHoverIn?: (event: MouseEvent) => void) =>
        (event: MouseEvent) =>
                stateEvent({callback: () => onHoverIn?.(event), eventName: 'hoverIn'})('hovered')(event)

const handleHoverOutEvent =
        ({stateEvent}: HandleStateEventOptions) =>
        (onHoverOut?: (event: MouseEvent) => void) =>
        (event: MouseEvent) =>
                stateEvent({callback: () => onHoverOut?.(event), eventName: 'hoverOut'})('enabled')(event)

const handleFocusEvent =
        ({stateEvent}: HandleStateEventOptions) =>
        (onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
        (event: NativeSyntheticEvent<TargetedEvent>) =>
                stateEvent({callback: () => onFocus?.(event), eventName: 'focus'})('focused')(event)

const handleBlurEvent =
        ({stateEvent}: HandleStateEventOptions) =>
        (onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
        (event: NativeSyntheticEvent<TargetedEvent>) =>
                stateEvent({callback: () => onBlur?.(event), eventName: 'blur'})('enabled')(event)

const handleLayoutEvent =
        ({stateEvent}: HandleStateEventOptions) =>
        (onLayout?: (event: LayoutChangeEvent) => void) =>
        (event: LayoutChangeEvent) =>
                stateEvent({callback: () => onLayout?.(event), eventName: 'layout'})('enabled')(event)

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
        const stateEvent = (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEventType) =>
                handleStateEventChange({...options, disabled, onStateEventChange})(disabled ? 'disabled' : state)(event)

        const handleBlur = handleBlurEvent({stateEvent})(onBlur)
        const handleFocus = handleFocusEvent({stateEvent})(onFocus)
        const handleHoverIn = handleHoverIntEvent({stateEvent})(onHoverIn)
        const handleHoverOut = handleHoverOutEvent({stateEvent})(onHoverOut)
        const handleLayout = handleLayoutEvent({stateEvent})(onLayout)
        const handleLongPress = handleLongPressEvent({stateEvent})(onLongPress)
        const handlePress = handlePressEvent({stateEvent, mobileDevice})(onPress)
        const handlePressIn = handlePressInEvent({stateEvent})(onPressIn)
        const handlePressOut = handlePressOutEvent({stateEvent, mobileDevice})(onPressOut)

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
