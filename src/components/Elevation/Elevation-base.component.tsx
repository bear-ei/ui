import {useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {ElevationBaseProps, ElevationState} from './Elevation.interface'

import {COMPONENT_STATUS} from '../../constants'
import {updateElevationLevel} from './Elevation.handler'
import {RenderElevation} from './Elevation.render'
import {useElevationAnimated} from './use-elevation-animated.hook'

export const ElevationBase: FC<ElevationBaseProps> = ({
	defaultLevel,
	entry,
	exit,
	level: rawLevel,
	onAnimationFinished,
	...renderElevationProps
}) => {
	const [{level, status}, setState] = useImmer<ElevationState>({
		level: rawLevel ?? defaultLevel,
		status: COMPONENT_STATUS.IDLE
	})

	const id = useId()
	const runUpdateLevel = useMemo(() => updateElevationLevel(setState), [setState])
	const {shadowAnimatedStyle} = useElevationAnimated({
		entry,
		exit,
		level,
		onAnimationFinished,
		status
	})

	useEffect(() => {
		runUpdateLevel(rawLevel)
	}, [runUpdateLevel, rawLevel])

	return (
		<RenderElevation
			{...renderElevationProps}
			id={id}
			shadowAnimatedStyle={shadowAnimatedStyle}
		/>
	)
}
