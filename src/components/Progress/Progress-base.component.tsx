import {forwardRef, useId, useMemo} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import type {State} from '../Common'
import {handleProgressLayoutChange, handleTouchableStateChange} from './Progress-handle'
import {PROGRESS_TYPE} from './Progress.enum'
import type {ProgressBaseProps, ProgressState} from './Progress.interface'

export const ProgressBase = forwardRef<View, ProgressBaseProps>(
	({renderProgress, type = PROGRESS_TYPE.LINEAR, ...renderProgressProps}, ref) => {
		const [{layout}, setState] = useImmer<ProgressState>({layout: {} as LayoutRectangle})
		const id = useId()
		const onProgressLayoutChange = useMemo(
			() => debounce(handleProgressLayoutChange(setState)(type))(50),
			[setState, type]
		)

		const onStateEventChange =
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleTouchableStateChange({...options, state, onLayoutChange: onProgressLayoutChange})(
					event
				)

		const interactionHandlers = useStateEvent({...renderProgressProps, onStateEventChange})

		return renderProgress({...renderProgressProps, layout, interactionHandlers, ref, type, id})
	}
)
