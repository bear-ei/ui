import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {ProgressBase} from './Progress-base.component'
import type {ProgressProps} from './Progress.interface'
import {renderProgress} from './Progress.render'

const ProgressWithRef = forwardRef<View, ProgressProps>((props, ref) => (
	<ProgressBase
		{...props}
		ref={ref}
		renderProgress={renderProgress}
	/>
))

export const Progress = typedMemo(ProgressWithRef)()
