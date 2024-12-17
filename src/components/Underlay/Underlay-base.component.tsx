import {forwardRef, useId} from 'react'
import {LayoutChangeEvent, LayoutRectangle, View} from 'react-native'

import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {EventName, State} from '../Common'
import {HandleUnderlayStateChangeOptions, UnderlayBaseProps, UnderlayState} from './Underlay.interface'
import {useUnderlayAnimated} from './use-underlay-animated.hook'

const handleUnderlayContentLayoutChanged = (setState: Updater<UnderlayState>) => (layout: LayoutRectangle) => {
        const {width, height} = layout

        setState(draft => {
                draft.layout.height = height
                draft.layout.width = width
        })
}

const handleUnderlayStateChange =
        ({eventName, onLayoutChanged}: HandleUnderlayStateChangeOptions) =>
        (event: StateEvent) => {
                const nextEvent = {
                        layout: () => onLayoutChanged((event as LayoutChangeEvent).nativeEvent.layout)
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
                const onUnderlayContentLayoutChanged = handleUnderlayContentLayoutChanged(setState)
                const {hoverLayerAnimatedStyle, activeLayerAnimatedStyle} = useUnderlayAnimated({
                        active,
                        activeAnimatedType,
                        activeScale,
                        eventName,
                        layout,
                        opacities
                })

                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleUnderlayStateChange({
                                        ...options,
                                        onLayoutChanged: onUnderlayContentLayoutChanged,
                                        state
                                })(event)

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
