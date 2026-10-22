import {useEffect, useMemo} from 'react'
import {cancelAnimation, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseProgressActiveIndicatorLinearAnimatedOptions} from './Progress-active-indicator-linear.interface'

import {COMPONENT_STATUS} from '../../../constants'
import {useAnimatedTiming} from '../../../hooks'
import {debounce} from '../../../utils'
import {animateProgressActiveIndicatorLinear} from './Progress-active-indicator-linear.handler'

export const useProgressActiveIndicatorLinearAnimated = ({
	status,
	value = 0
}: UseProgressActiveIndicatorLinearAnimatedOptions) => {
	const widthSharedValue = useSharedValue(value)
	const animatedTiming = useAnimatedTiming()
	const contentAnimatedStyle = useAnimatedStyle(() => ({width: `${widthSharedValue.value * 100}%`}))
	const runAnimate = useMemo(
		() => debounce(animateProgressActiveIndicatorLinear(widthSharedValue, animatedTiming), 30),
		[animatedTiming, widthSharedValue]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimate(value)
		}

		return () => runAnimate.cancel()
	}, [runAnimate, status, value])

	useEffect(() => () => cancelAnimation(widthSharedValue), [widthSharedValue])

	return {contentAnimatedStyle}
}
