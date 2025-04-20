import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {ProgressActiveIndicatorLinearBaseProps} from './Progress-active-indicator-linear.interface'
import {useProgressActiveIndicatorLinearAnimated} from './use-progress-active-indicator-linear-animated.hook'

export const ProgressActiveIndicatorLinearBase = forwardRef<View, ProgressActiveIndicatorLinearBaseProps>(
	(
		{
			containerLayout,
			defaultValue,
			increment,
			renderProgressActiveIndicatorLinear,
			value,
			...renderProgressActiveIndicatorLinearProps
		},
		ref
	) => {
		const id = useId()
		const {contentAnimatedStyle} = useProgressActiveIndicatorLinearAnimated({
			containerLayout,
			defaultValue,
			increment,
			value
		})

		return renderProgressActiveIndicatorLinear({
			...renderProgressActiveIndicatorLinearProps,
			ref,
			contentAnimatedStyle,
			id
		})
	}
)
