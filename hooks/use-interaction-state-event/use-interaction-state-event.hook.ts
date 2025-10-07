import {STATE, State} from '@/constants'
import {useCallback, useMemo} from 'react'
import {Platform} from 'react-native'
import {
        createStableEventHandler,
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
                () => createStableEventHandler(handleBlurEvent({interactionHandlers})(rawOnBlur)),
                [interactionHandlers, rawOnBlur]
        )

        const onFocus = useMemo(
                () => createStableEventHandler(handleFocusEvent({interactionHandlers})(rawOnFocus)),
                [interactionHandlers, rawOnFocus]
        )

        const onHoverIn = useMemo(
                () => createStableEventHandler(handleHoverIntEvent({interactionHandlers})(rawOnHoverIn)),
                [interactionHandlers, rawOnHoverIn]
        )

        const onHoverOut = useMemo(
                () => createStableEventHandler(handleHoverOutEvent({interactionHandlers})(rawOnHoverOut)),
                [interactionHandlers, rawOnHoverOut]
        )

        const onLongPress = useMemo(
                () => createStableEventHandler(handleLongPressEvent({interactionHandlers})(rawOnLongPress)),
                [interactionHandlers, rawOnLongPress]
        )

        const onPress = useMemo(
                () =>
                        createStableEventHandler(
                                handlePressEvent({interactionHandlers, mobileDevice: isMobileDevice})(rawOnPress)
                        ),
                [interactionHandlers, isMobileDevice, rawOnPress]
        )

        const onPressIn = useMemo(
                () => createStableEventHandler(handlePressInEvent({interactionHandlers})(rawOnPressIn)),
                [interactionHandlers, rawOnPressIn]
        )

        const onPressOut = useMemo(
                () =>
                        createStableEventHandler(
                                handlePressOutEvent({interactionHandlers, mobileDevice: isMobileDevice})(rawOnPressOut)
                        ),
                [interactionHandlers, isMobileDevice, rawOnPressOut]
        )

        const onLayout = useMemo(
                () => createStableEventHandler(handleLayoutEvent({interactionHandlers})(rawOnLayout)),
                [interactionHandlers, rawOnLayout]
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
