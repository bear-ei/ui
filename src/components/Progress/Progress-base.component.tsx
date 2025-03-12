import {forwardRef, useId, useMemo} from 'react'
import {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import {HandleStateEventChangeOptions, StateEventType, useStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {State} from '../Common'
import {handleProgressLayoutChange, handleTouchableStateChange} from './Progress-handle'
import {ProgressBaseProps, ProgressState} from './Progress.interface'

export const ProgressBase = forwardRef<View, ProgressBaseProps>(({render, type = 'linear', ...renderProps}, ref) => {
        const [{layout}, setState] = useImmer<ProgressState>({layout: {} as LayoutRectangle})
        const id = useId()
        const onProgressLayoutChange = useMemo(
                () => debounce(handleProgressLayoutChange(setState)(type))(50),
                [setState, type]
        )

        const onStateEventChange =
                (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEventType) =>
                        handleTouchableStateChange({...options, state, onLayoutChange: onProgressLayoutChange})(event)

        const stateEvent = useStateEvent({...renderProps, onStateEventChange})

        return render({...renderProps, layout, stateEvent, ref, type, id})
})
