import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import type {ProgressActiveIndicatorCircularBaseProps} from './Progress-active-indicator-circular.interface'
import {useProgressActiveIndicatorCircularAnimated} from './use-progress-active-indicator-circular-animated.hook'

export const ProgressActiveIndicatorCircularBase = forwardRef<View, ProgressActiveIndicatorCircularBaseProps>(
	(
		{
			size: rawSize,
			renderProgressActiveIndicatorCircular,
			strokeWidth: rawStrokeWidth,
			...renderProgressActiveIndicatorCircularProps
		},
		ref
	) => {
		const theme = useTheme()
		const id = useId()
		const strokeWidth = rawStrokeWidth ?? theme.adaptSize(theme.token.spacing.extraSmall)
		const size = rawSize ?? theme.adaptSize(theme.token.spacing.extraSmall * 12)
		const radius = (size - strokeWidth) / 2
		const circumference = 2 * Math.PI * radius
		const {containerAnimatedStyle, circleAnimatedProps} = useProgressActiveIndicatorCircularAnimated({
			circumference
		})

		return renderProgressActiveIndicatorCircular({
			...renderProgressActiveIndicatorCircularProps,
			circleAnimatedProps,
			circumference,
			containerAnimatedStyle,
			id,
			radius,
			ref,
			size,
			strokeWidth,
			theme
		})
	}
)
