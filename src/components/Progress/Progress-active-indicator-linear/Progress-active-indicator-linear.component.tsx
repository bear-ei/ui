import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {ProgressActiveIndicatorLinearBase} from './Progress-active-indicator-linear-base.component'
import type {ProgressActiveIndicatorLinearProps} from './Progress-active-indicator-linear.interface'

const ProgressActiveIndicatorLinearWithRef = forwardRef<View, ProgressActiveIndicatorLinearProps>((props, ref) => (
	<ProgressActiveIndicatorLinearBase
		{...props}
		ref={ref}
	/>
))

export const ProgressActiveIndicatorLinear = typedMemo(ProgressActiveIndicatorLinearWithRef)()
