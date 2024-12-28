import {forwardRef, useId, useMemo} from 'react'
import {LayoutChangeEvent, LayoutRectangle, View} from 'react-native'

import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangedOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {EventName, State} from '../Common'
import {HandleUnderlayStateChangedOptions, UnderlayBaseProps, UnderlayState} from './Underlay.interface'
import {useUnderlayAnimated} from './use-underlay-animated.hook'

const handleUnderlayContentLayoutChanged = (setState: Updater<UnderlayState>) => (layout: LayoutRectangle) => {
        const {width, height} = layout

        setState(draft => {
                draft.layout.height = height
                draft.layout.width = width
        })
}

const handleUnderlayStateChanged =
        ({eventName, onLayoutChanged}: HandleUnderlayStateChangedOptions) =>
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
                        active: rawActive,
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
                const active = rawActive ?? defaultActive
                const onUnderlayContentLayoutChanged = useMemo(
                        () => debounce(handleUnderlayContentLayoutChanged(setState))(50),
                        [setState]
                )

                const {hoverLayerAnimatedStyle, activeLayerAnimatedStyle} = useUnderlayAnimated({
                        active,
                        activeAnimatedType,
                        activeScale,
                        eventName,
                        layout,
                        opacities
                })

                const onStateEventChange =
                        (options: OnStateEventChangedOptions) => (state: State) => (event: StateEvent) =>
                                handleUnderlayStateChanged({
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
