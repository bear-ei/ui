import {forwardRef, useId, useMemo} from 'react'
import {LayoutChangeEvent, LayoutRectangle, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {EventName, State} from '../Common'
import {HandleProgressStateChangeOptions, ProgressBaseProps, ProgressState} from './Progress.interface'

const handleProgressLayoutChanged = (setState: Updater<ProgressState>) => (layout: LayoutRectangle) => {
        const {width, height} = layout

        setState(draft => {
                draft.layout.height = height
                draft.layout.width = width
        })
}

const handleTouchableStateChange =
        ({eventName, onLayoutChanged}: HandleProgressStateChangeOptions) =>
        (event: StateEvent) => {
                const nextEvent = {
                        layout: () => onLayoutChanged((event as LayoutChangeEvent).nativeEvent.layout)
                } as Record<EventName, () => void>

                if (eventName) {
                        nextEvent[eventName]?.()
                }
        }

export const ProgressBase = forwardRef<View, ProgressBaseProps>(
        ({render, type = 'linear', animated = 'determinate', ...renderProps}, ref) => {
                const [{layout}, setState] = useImmer<ProgressState>({layout: {} as LayoutRectangle})
                const id = useId()
                const onProgressLayoutChanged = useMemo(
                        () => debounce(handleProgressLayoutChanged(setState))(50),
                        [setState]
                )

                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleTouchableStateChange({
                                        ...options,
                                        state,
                                        onLayoutChanged: onProgressLayoutChanged
                                })(event)

                const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})

                return render({...renderProps, animated, id, layout, onStateEvent, ref, type})
        }
)
