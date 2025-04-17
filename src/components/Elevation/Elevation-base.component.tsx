import {forwardRef, useId, useMemo} from 'react'
import type {View} from 'react-native'
import type {ElevationBaseProps} from './Elevation.interface'
import {useElevationAnimated} from './use-elevation-animated.hook'

export const ElevationBase = forwardRef<View, ElevationBaseProps>(
	({defaultLevel, level, render, testID, ...renderProps}, ref) => {
		const id = useId()
		const elevationLevel = useMemo(() => level ?? defaultLevel, [defaultLevel, level])
		const {shadowAnimatedStyle} = useElevationAnimated({level: elevationLevel})

		return render({...renderProps, level: elevationLevel, ref, shadowAnimatedStyle, testID: testID ?? id})
	}
)
