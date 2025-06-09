import {EASING} from '@bearei/material-token'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedProps, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {
	animateProgressActiveIndicatorCircular,
	computeProgressStrokeDashoffset
} from './Progress-active-indicator-circular.handler'
import type {UseProgressActiveIndicatorCircularAnimatedOptions} from './Progress-active-indicator-circular.interface'

export const useProgressActiveIndicatorCircularAnimated = ({
	circumference,
	enableAnimated
}: UseProgressActiveIndicatorCircularAnimatedOptions) => {
	const theme = useTheme()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animateSharedValueTo = useMemo(
		() => animatedTiming({repeat: 0, duration: 2000, easing: EASING.LINEAR}),
		[animatedTiming]
	)

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
		() =>
			animateProgressActiveIndicatorCircular(animateSharedValueTo)({
				circleSharedValue,
				containerSharedValue
			}),
		[animateSharedValueTo, circleSharedValue, containerSharedValue]
	)

	useEffect(() => {
		runAnimate(enableAnimated)
	}, [enableAnimated, runAnimate])

	useEffect(
		() => () => {
			cancelAnimation(circleSharedValue)
			cancelAnimation(containerSharedValue)
		},
		[circleSharedValue, containerSharedValue]
	)

	return {containerAnimatedStyle, circleAnimatedProps}
}
