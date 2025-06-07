import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedProps, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {
	animateProgressActiveIndicatorCircular,
	computeProgressStrokeDashoffset
} from './Progress-active-indicator-circular.handler'
import type {UseProgressActiveIndicatorCircularAnimatedOptions} from './Progress-active-indicator-circular.interface'

export const useProgressActiveIndicatorCircularAnimated = ({
	circumference
}: UseProgressActiveIndicatorCircularAnimatedOptions) => {
	const theme = useTheme()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const circleSharedValue = useSharedValue(0)
	const containerSharedValue = useSharedValue(0)
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{rotate: `${interpolate(containerSharedValue.value, [0, 1, 2], [0, 360, 720])}deg`}]
	}))

	const circleStrokeDashoffsetOutputRanges = useMemo(
		() => [
			computeProgressStrokeDashoffset(circumference)(0.1),
			computeProgressStrokeDashoffset(circumference)(0.8),
			computeProgressStrokeDashoffset(circumference)(0.1)
		],
		[circumference]
	)

	const circleAnimatedProps = useAnimatedProps(() => ({
		strokeDashoffset: interpolate(circleSharedValue.value, [0, 1, 2], circleStrokeDashoffsetOutputRanges)
	}))

	const runAnimate = useMemo(
		() => animateProgressActiveIndicatorCircular(animatedTiming)({circleSharedValue, containerSharedValue}),
		[animatedTiming, circleSharedValue, containerSharedValue]
	)

	useEffect(() => {
		runAnimate(2)
	}, [runAnimate])

	return {containerAnimatedStyle, circleAnimatedProps}
}
