import {EVENT_NAME, STATE, type State} from '@/constants'
import type {BlurEvent, FocusEvent, GestureResponderEvent, LayoutChangeEvent, MouseEvent} from 'react-native'
import type {
    HandleStateEventChangeOptions,
    HandleStateEventOptions,
    StateEvent,
    UseHandleStateEventOptions
} from './use-interaction-state-event.interface'

export const createStableEventHandler =
    <T extends StateEvent>(handler: (event: T) => void) =>
    (event: T) => {
        if (event && typeof event.persist === 'function') {
            event.persist()
            event.stopPropagation?.()
        }

        return handler(event)
    }

export const handleStateEventChange =
    ({callback, disabled, eventName, onStateEventChange}: HandleStateEventChangeOptions) =>
    (state: State) =>
    (event: StateEvent) => {
        if (disabled && eventName !== EVENT_NAME.LAYOUT) {
            return
        }

        onStateEventChange?.({eventName})(state)(event)
        callback?.()
    }

export const handlePressInEvent =
    ({interactionHandlers}: HandleStateEventOptions) =>
    (onPressIn?: UseHandleStateEventOptions['onPressIn']) =>
    (event: GestureResponderEvent) =>
        interactionHandlers({callback: () => onPressIn?.(event), eventName: EVENT_NAME.PRESS_IN})(STATE.PRESS_IN)(event)

export const handlePressEvent =
    ({interactionHandlers, mobileDevice}: HandleStateEventOptions) =>
    (onPress?: UseHandleStateEventOptions['onPress']) =>
    (event: GestureResponderEvent) =>
        interactionHandlers({callback: () => onPress?.(event), eventName: EVENT_NAME.PRESS})(
            mobileDevice ? STATE.ENABLED : STATE.HOVERED
        )(event)

export const handleLongPressEvent =
    ({interactionHandlers}: HandleStateEventOptions) =>
    (onLongPress?: UseHandleStateEventOptions['onLongPress']) =>
    (event: GestureResponderEvent) =>
        interactionHandlers({callback: () => onLongPress?.(event), eventName: EVENT_NAME.LONG_PRESS})(
            STATE.LONG_PRESS_IN
        )(event)

export const handlePressOutEvent =
    ({interactionHandlers, mobileDevice}: HandleStateEventOptions) =>
    (onPressOut?: UseHandleStateEventOptions['onPressOut']) =>
    (event: GestureResponderEvent) =>
        interactionHandlers({callback: () => onPressOut?.(event), eventName: EVENT_NAME.PRESS_OUT})(
            mobileDevice ? STATE.ENABLED : STATE.HOVERED
        )(event)

export const handleHoverInEvent =
    ({interactionHandlers}: HandleStateEventOptions) =>
    (onHoverIn?: UseHandleStateEventOptions['onHoverIn']) =>
    (event: MouseEvent) =>
        interactionHandlers({callback: () => onHoverIn?.(event), eventName: EVENT_NAME.HOVER_IN})(STATE.HOVERED)(event)

export const handleHoverOutEvent =
    ({interactionHandlers}: HandleStateEventOptions) =>
    (onHoverOut?: UseHandleStateEventOptions['onHoverOut']) =>
    (event: MouseEvent) =>
        interactionHandlers({callback: () => onHoverOut?.(event), eventName: EVENT_NAME.HOVER_OUT})(STATE.ENABLED)(
            event
        )

export const handleFocusEvent =
    ({interactionHandlers}: HandleStateEventOptions) =>
    (onFocus?: UseHandleStateEventOptions['onFocus']) =>
    (event: FocusEvent) =>
        interactionHandlers({callback: () => onFocus?.(event), eventName: EVENT_NAME.FOCUS})(STATE.FOCUSED)(event)

export const handleBlurEvent =
    ({interactionHandlers}: HandleStateEventOptions) =>
    (onBlur?: UseHandleStateEventOptions['onBlur']) =>
    (event: BlurEvent) =>
        interactionHandlers({callback: () => onBlur?.(event), eventName: EVENT_NAME.BLUR})(STATE.ENABLED)(event)

export const handleLayoutEvent =
    ({interactionHandlers}: HandleStateEventOptions) =>
    (onLayout?: UseHandleStateEventOptions['onLayout']) =>
    (event: LayoutChangeEvent) =>
        interactionHandlers({callback: () => onLayout?.(event), eventName: EVENT_NAME.LAYOUT})(STATE.ENABLED)(event)
