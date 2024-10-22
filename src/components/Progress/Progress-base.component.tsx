import {forwardRef, useId} from 'react'
import {LayoutChangeEvent, LayoutRectangle, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {
    OnStateEventChangeOptions,
    StateEvent,
    useOnStateEvent
} from '../../hooks'
import {EventName, State} from '../Common'
import {
    HandleProgressStateChangeOptions,
    ProgressBaseProps,
    ProgressState
} from './Progress.interface'

const handleProgressLayout =
    (setState: Updater<ProgressState>) => (event: LayoutChangeEvent) => {
        const nativeEventLayout = event.nativeEvent.layout

        setState(draft => {
            draft.layout.width = nativeEventLayout.width
            draft.layout.height = nativeEventLayout.height
        })
    }

const handleTouchableStateChange =
    ({eventName}: HandleProgressStateChangeOptions) =>
    (setState: Updater<ProgressState>) =>
    (event: StateEvent) => {
        const nextEvent = {
            layout: () =>
                handleProgressLayout(setState)(event as LayoutChangeEvent)
        } as Record<EventName, () => void>

        if (eventName) {
            nextEvent[eventName]?.()
        }
    }

export const ProgressBase = forwardRef<View, ProgressBaseProps>(
    (
        {render, type = 'linear', animated = 'determinate', ...renderProps},
        ref
    ) => {
        const [{layout}, setState] = useImmer<ProgressState>({
            layout: {} as LayoutRectangle
        })

        const id = useId()
        const onStateEventChange =
            (options: OnStateEventChangeOptions) =>
            (state: State) =>
            (event: StateEvent) =>
                handleTouchableStateChange({...options, state})(setState)(event)

        const onStateEvent = useOnStateEvent({
            ...renderProps,
            onStateEventChange
        })

        return render({
            ...renderProps,
            animated,
            id,
            layout,
            onStateEvent,
            ref,
            type
        })
    }
)
