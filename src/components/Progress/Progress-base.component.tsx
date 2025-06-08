import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import {PROGRESS_TYPE} from './Progress.enum'
import type {ProgressBaseProps} from './Progress.interface'

export const ProgressBase = forwardRef<View, ProgressBaseProps>(
	({renderProgress, type = PROGRESS_TYPE.LINEAR, ...renderProgressProps}, ref) => {
		const id = useId()

		return renderProgress({...renderProgressProps, ref, type, id})
	}
)
