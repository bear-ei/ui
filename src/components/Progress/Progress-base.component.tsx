import {forwardRef, useCallback, useId, useMemo} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useInteractionStateEvent} from '../../hooks'
import type {State} from '../Common'
import {PROGRESS_TYPE} from './Progress.enum'
import {handleProgressStateChange, updateProgressLayoutSize} from './Progress.handler'
import type {ProgressBaseProps, ProgressState} from './Progress.interface'

export const ProgressBase = forwardRef<View, ProgressBaseProps>(
	({renderProgress, type = PROGRESS_TYPE.LINEAR, ...renderProgressProps}, ref) => {
		const [{layout}, setState] = useImmer<ProgressState>({layout: {} as LayoutRectangle})
		const id = useId()
		const onLayoutChange = useMemo(() => updateProgressLayoutSize(type)(setState), [setState, type])
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleProgressStateChange({...options, state, onLayoutChange})(event),
			[onLayoutChange]
		)

		const interactionHandlers = useInteractionStateEvent({...renderProgressProps, onStateEventChange})

		return renderProgress({...renderProgressProps, layout, interactionHandlers, ref, type, id})
	}
)
