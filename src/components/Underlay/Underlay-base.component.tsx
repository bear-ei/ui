import {forwardRef, useCallback, useId} from 'react'
import {LayoutChangeEvent, LayoutRectangle, View} from 'react-native'

import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {EventName, State} from '../Common'
import {HandleUnderlayStateChangeOptions, UnderlayBaseProps, UnderlayProps, UnderlayState} from './Underlay.interface'
import {useUnderlayAnimated} from './use-underlay-animated.hook'

export const handleUnderlayPropsEqual = (prevProps: UnderlayProps) => {
        const {eventName: prevEventName, active: prevActive} = prevProps

        return (nextProps: UnderlayProps) => {
                const {eventName: nextEventName, active: nextActive} = nextProps

                return ![prevEventName !== nextEventName, prevActive !== nextActive].some(Boolean)
        }
}

const handleUnderlayContentLayout = (setState: Updater<UnderlayState>) => (event: LayoutChangeEvent) => {
        const nativeEventLayout = event.nativeEvent.layout

        setState(draft => {
                draft.layout.width = nativeEventLayout.width
                draft.layout.height = nativeEventLayout.height
        })
}

const handleUnderlayStateChange =
        ({eventName}: HandleUnderlayStateChangeOptions) =>
        (setState: Updater<UnderlayState>) =>
        (event: StateEvent) => {
                const nextEvent = {
                        layout: () => handleUnderlayContentLayout(setState)(event as LayoutChangeEvent)
                } as Record<EventName, () => void>

                if (eventName) {
                        nextEvent[eventName]?.()
                }
        }

export const UnderlayBase = forwardRef<View, UnderlayBaseProps>(
        (
                {
                        active: activeSource,
                        activeAnimatedType,
                        activeScale,
                        defaultActive,
                        eventName,
                        opacities,
                        render,
                        ...renderProps
                },
                ref
        ) => {
                const [{layout}, setState] = useImmer<UnderlayState>({layout: {} as LayoutRectangle})
                const id = useId()
                const active = activeSource ?? defaultActive
                const {hoverLayerAnimatedStyle, activeLayerAnimatedStyle} = useUnderlayAnimated({
                        active,
                        activeAnimatedType,
                        activeScale,
                        eventName,
                        layout,
                        opacities
                })

                const onStateEventChange = useCallback(
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleUnderlayStateChange({...options, state})(setState)(event),
                        [setState]
                )

                const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})

                return render({
                        ...renderProps,
                        active,
                        activeLayerAnimatedStyle,
                        hoverLayerAnimatedStyle,
                        id,
                        onStateEvent,
                        ref
                })
        }
)
