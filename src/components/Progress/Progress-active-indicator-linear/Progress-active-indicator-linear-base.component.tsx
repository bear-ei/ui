import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {ProgressActiveIndicatorLinearBaseProps} from './Progress-active-indicator-linear.interface'
import {useProgressActiveIndicatorLinearAnimated} from './use-progress-active-indicator-linear-animated.hook'

export const ProgressActiveIndicatorLinearBase = forwardRef<View, ProgressActiveIndicatorLinearBaseProps>(
	(
		{defaultValue, renderProgressActiveIndicatorLinear, value, ...renderProgressActiveIndicatorLinearProps},
		ref
	) => {
		const id = useId()
		const {contentAnimatedStyle} = useProgressActiveIndicatorLinearAnimated({defaultValue, value})

		return renderProgressActiveIndicatorLinear({
			...renderProgressActiveIndicatorLinearProps,
			ref,
			contentAnimatedStyle,
			id
		})
	}
)
