import {
        GestureResponderEvent,
        InteractionManager,
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
        OnStateEventChangeOptions,
        StateEvent,
        UseHandleStateEventOptions
} from './hooks.interface'

/**
 * The ripple animation is usually triggered by PressIn before responding to a Interactive event. To avoid noticeable
 * animation lag.  It is necessary to respond to the Interactive event after the PressIn ripple has ended.
 */
const handleStateEventChange =
        ({callback, disabled, eventName, onStateEventChange}: HandleStateEventChangeOptions) =>
        (state: State) =>
        (event: StateEvent) =>
                InteractionManager.runAfterInteractions(() => {
                        if (disabled && eventName !== 'layout') {
                                return
                        }

                        onStateEventChange?.({eventName})(state)(event)
                        callback?.()
                })

const handlePressInEvent =
        ({onStateEvent}: HandleStateEventOptions) =>
        (onPressIn?: (event: GestureResponderEvent) => void) =>
        (event: GestureResponderEvent) =>
                onStateEvent({callback: () => onPressIn?.(event), eventName: 'pressIn'})('pressIn')(event)

const handlePressEvent =
        ({onStateEvent, mobileDevice}: HandleStateEventOptions) =>
        (onPress?: (event: GestureResponderEvent) => void) =>
        (event: GestureResponderEvent) =>
                onStateEvent({callback: () => onPress?.(event), eventName: 'press'})(
                        mobileDevice ? 'enabled' : 'hovered'
                )(event)

const handleLongPressEvent =
        ({onStateEvent}: HandleStateEventOptions) =>
        (onLongPress?: (event: GestureResponderEvent) => void) =>
        (event: GestureResponderEvent) =>
                onStateEvent({callback: () => onLongPress?.(event), eventName: 'longPress'})('longPressIn')(event)

const handlePressOutEvent =
        ({onStateEvent, mobileDevice}: HandleStateEventOptions) =>
        (onPressOut?: (event: GestureResponderEvent) => void) =>
        (event: GestureResponderEvent) =>
                onStateEvent({callback: () => onPressOut?.(event), eventName: 'pressOut'})(
                        mobileDevice ? 'enabled' : 'hovered'
                )(event)

const handleHoverIntEvent =
        ({onStateEvent}: HandleStateEventOptions) =>
        (onHoverIn?: (event: MouseEvent) => void) =>
        (event: MouseEvent) =>
                onStateEvent({callback: () => onHoverIn?.(event), eventName: 'hoverIn'})('hovered')(event)

const handleHoverOutEvent =
        ({onStateEvent}: HandleStateEventOptions) =>
        (onHoverOut?: (event: MouseEvent) => void) =>
        (event: MouseEvent) =>
                onStateEvent({callback: () => onHoverOut?.(event), eventName: 'hoverOut'})('enabled')(event)

const handleFocusEvent =
        ({onStateEvent}: HandleStateEventOptions) =>
        (onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
        (event: NativeSyntheticEvent<TargetedEvent>) =>
                onStateEvent({callback: () => onFocus?.(event), eventName: 'focus'})('focused')(event)

const handleBlurEvent =
        ({onStateEvent}: HandleStateEventOptions) =>
        (onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void) =>
        (event: NativeSyntheticEvent<TargetedEvent>) =>
                onStateEvent({callback: () => onBlur?.(event), eventName: 'blur'})('enabled')(event)

const handleLayoutEvent =
        ({onStateEvent}: HandleStateEventOptions) =>
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
}: UseHandleStateEventOptions) => {
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
