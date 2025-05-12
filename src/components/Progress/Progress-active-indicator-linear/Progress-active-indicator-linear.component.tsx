import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {ProgressActiveIndicatorLinearBase} from './Progress-active-indicator-linear-base.component'
import type {ProgressActiveIndicatorLinearProps} from './Progress-active-indicator-linear.interface'
import {renderProgressActiveIndicatorLinear} from './Progress-active-indicator-linear.render'

const ProgressActiveIndicatorLinearWithRef = forwardRef<View, ProgressActiveIndicatorLinearProps>((props, ref) => (
	<ProgressActiveIndicatorLinearBase
		{...props}
		ref={ref}
		renderProgressActiveIndicatorLinear={renderProgressActiveIndicatorLinear}
	/>
))

export const ProgressActiveIndicatorLinear = typedMemo(ProgressActiveIndicatorLinearWithRef)()
