import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import type {ElevationBaseProps, ElevationState} from './Elevation.interface'
import {RenderElevation} from './Elevation.render'
import {useElevationAnimated} from './use-elevation-animated.hook'
import {useImmer} from 'use-immer'
import {COMPONENT_STATUS} from '../../constants'
import {updateElevationLevel} from './Elevation.handler'

export const ElevationBase = forwardRef<View, ElevationBaseProps>(
	({defaultLevel, level: rawLevel, onAnimationFinished, ...renderElevationProps}, ref) => {
		const [{level, action, status}, setState] = useImmer<ElevationState>({status: COMPONENT_STATUS.IDLE})
		const id = useId()
		const runUpdateLevel = useMemo(() => updateElevationLevel(setState), [setState])
		const {shadowAnimatedStyle} = useElevationAnimated({
			action,
			level: level ?? rawLevel,
			onAnimationFinished,
			status
		})

		useEffect(() => {
			runUpdateLevel(rawLevel ?? defaultLevel)
		}, [runUpdateLevel, defaultLevel, rawLevel])

		return (
			<RenderElevation
				{...renderElevationProps}
				id={id}
				level={level}
				ref={ref}
				shadowAnimatedStyle={shadowAnimatedStyle}
			/>
		)
	}
)

ElevationBase.displayName = 'ElevationBase'
