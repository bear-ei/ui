import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {COMPONENT_STATUS} from '../../constants'
import {updateElevationLevel} from './Elevation.handler'
import type {ElevationBaseProps, ElevationState} from './Elevation.interface'
import {RenderElevation} from './Elevation.render'
import {useElevationAnimated} from './use-elevation-animated.hook'

export const ElevationBase = forwardRef<View, ElevationBaseProps>(
	({defaultLevel, level: rawLevel, onAnimationFinished, entry, exit, ...renderElevationProps}, ref) => {
		const [{level, status}, setState] = useImmer<ElevationState>({status: COMPONENT_STATUS.IDLE})
		const id = useId()
		const runUpdateLevel = useMemo(() => updateElevationLevel(setState), [setState])
		const {shadowAnimatedStyle} = useElevationAnimated({
			entry,
			exit,
			level: level ?? rawLevel ?? defaultLevel,
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
				ref={ref}
				shadowAnimatedStyle={shadowAnimatedStyle}
			/>
		)
	}
)

ElevationBase.displayName = 'ElevationBase'
