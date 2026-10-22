import {useId, type FC} from 'react'

import type {ProgressBaseProps} from './Progress.interface'

import {PROGRESS_TYPE} from './Progress.enum'
import {RenderProgress} from './Progress.render'

export const ProgressBase: FC<ProgressBaseProps> = ({type = PROGRESS_TYPE.LINEAR, ...renderProgressProps}) => {
	const id = useId()

	return (
		<RenderProgress
			{...renderProgressProps}
			id={id}
			type={type}
		/>
	)
}

ProgressBase.displayName = 'ProgressBase'
