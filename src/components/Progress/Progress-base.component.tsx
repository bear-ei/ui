import {forwardRef, useId, useMemo} from 'react'
import {LayoutChangeEvent, LayoutRectangle, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {EventName, State} from '../Common'
import {HandleProgressStateChangeOptions, ProgressBaseProps, ProgressState} from './Progress.interface'

const handleProgressLayoutChange = (setState: Updater<ProgressState>) => (layout: LayoutRectangle) => {
        const {width, height} = layout

        setState(draft => {
                const {width: prevWidth, height: prevHeight} = draft.layout

                if (prevWidth !== width || prevHeight !== height) {
                        draft.layout.height = height
                        draft.layout.width = width
                }
        })
}

const handleTouchableStateChange =
        ({eventName, onLayoutChange}: HandleProgressStateChangeOptions) =>
        (event: StateEvent) => {
                const nextEvent = {
                        layout: () => onLayoutChange((event as LayoutChangeEvent).nativeEvent.layout)
                } as Record<EventName, () => void>

                if (eventName) {
                        nextEvent[eventName]?.()
                }
        }

export const ProgressBase = forwardRef<View, ProgressBaseProps>(
        ({render, type = 'linear', animated = 'determinate', ...renderProps}, ref) => {
                const [{layout}, setState] = useImmer<ProgressState>({layout: {} as LayoutRectangle})
                const id = useId()
                const onProgressLayoutChange = useMemo(
                        () => debounce(handleProgressLayoutChange(setState))(50),
                        [setState]
                )

                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleTouchableStateChange({
                                        ...options,
                                        state,
                                        onLayoutChange: onProgressLayoutChange
                                })(event)

                const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})

                return render({...renderProps, animated, id, layout, onStateEvent, ref, type})
        }
)
