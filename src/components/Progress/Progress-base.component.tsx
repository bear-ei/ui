import {forwardRef, useCallback, useId, useMemo} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useStateEvent} from '../../hooks'
import {createStableHandlerWithState} from '../../utils'
import type {State} from '../Common'
import {PROGRESS_TYPE} from './Progress.enum'
import {handleProgressStateChange, updateProgressLayoutSize} from './Progress.handle'
import type {ProgressBaseProps, ProgressState} from './Progress.interface'

export const ProgressBase = forwardRef<View, ProgressBaseProps>(
	({renderProgress, type = PROGRESS_TYPE.LINEAR, ...renderProgressProps}, ref) => {
		const [{layout}, setState] = useImmer<ProgressState>({layout: {} as LayoutRectangle})
		const id = useId()
		const onProgressLayoutChange = useMemo(
			() => createStableHandlerWithState(updateProgressLayoutSize(type))(setState)(),
			[setState, type]
		)

		const onProgressStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleProgressStateChange({...options, state, onLayoutChange: onProgressLayoutChange})(
					event
				),
			[onProgressLayoutChange]
		)

		const interactionHandlers = useStateEvent({
			...renderProgressProps,
			onStateEventChange: onProgressStateEventChange
		})

		return renderProgress({...renderProgressProps, layout, interactionHandlers, ref, type, id})
	}
)
