import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {ElevationBaseProps} from './Elevation.interface'
import {useElevationAnimated} from './use-elevation-animated.hook'

export const ElevationBase = forwardRef<View, ElevationBaseProps>(
	({defaultLevel, level, renderElevation, ...renderElevationProps}, ref) => {
		const id = useId()
		const elevationLevel = level ?? defaultLevel
		const {shadowAnimatedStyle} = useElevationAnimated({level: elevationLevel})

		return renderElevation({
			...renderElevationProps,
			id,
			level: elevationLevel,
			ref,
			shadowAnimatedStyle
		})
	}
)
