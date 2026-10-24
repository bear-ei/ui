import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedProps, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseProgressActiveIndicatorCircularAnimatedOptions} from './Progress-active-indicator-circular.interface'

import {COMPONENT_STATUS} from '../../../constants'
import {useAnimatedTiming} from '../../../hooks'
import {toPlatformUnit} from '../../../utils'
import {
	animateProgressActiveIndicatorCircular,
	computeProgressStrokeDashoffset
} from './Progress-active-indicator-circular.handler'

export const useProgressActiveIndicatorCircularAnimated = ({
	circumference,
	enableLoop,
	status
}: UseProgressActiveIndicatorCircularAnimatedOptions) => {
	const animatedTiming = useAnimatedTiming()
	const circleSharedValue = useSharedValue(0)
	const containerSharedValue = useSharedValue(0)
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{rotate: `${interpolate(containerSharedValue.value, [0, 1, 2], [0, 360, 720])}deg`}]
	}))

	const circleStrokeDashoffsetOutputRanges = useMemo(() => {
		const compute = computeProgressStrokeDashoffset(circumference)

		return [compute(0.1), compute(0.8), compute(0.1)]
	}, [circumference])

	const circleAnimatedProps = useAnimatedProps(() => ({
		strokeDashoffset: toPlatformUnit(
			interpolate(circleSharedValue.value, [0, 1, 2], circleStrokeDashoffsetOutputRanges)
		)
	}))

	const runAnimate = useMemo(
		() => animateProgressActiveIndicatorCircular([circleSharedValue, containerSharedValue], animatedTiming),
		[animatedTiming, circleSharedValue, containerSharedValue]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimate(enableLoop)
		}
	}, [enableLoop, runAnimate, status])

	useEffect(
		() => () => {
			cancelAnimation(circleSharedValue)
			cancelAnimation(containerSharedValue)
		},
		[circleSharedValue, containerSharedValue]
	)

	return {circleAnimatedProps, containerAnimatedStyle}
}
