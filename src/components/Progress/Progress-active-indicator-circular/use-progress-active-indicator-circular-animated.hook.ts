import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedProps, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {
	handleProgressActiveIndicatorCircularAnimatedTiming,
	handleProgressActiveIndicatorCircularStrokeDashoffset
} from './Progress-active-indicator-circular-handle'
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

	const circleStrokeDashoffsetOutputRanges = [
		handleProgressActiveIndicatorCircularStrokeDashoffset(circumference)(0.1),
		handleProgressActiveIndicatorCircularStrokeDashoffset(circumference)(0.8),
		handleProgressActiveIndicatorCircularStrokeDashoffset(circumference)(0.1)
	]

	const circleAnimatedProps = useAnimatedProps(() => ({
		strokeDashoffset: interpolate(circleSharedValue.value, [0, 1, 2], circleStrokeDashoffsetOutputRanges)
	}))

	const onProgressActiveIndicatorCircularAnimatedTiming = useMemo(
		() =>
			handleProgressActiveIndicatorCircularAnimatedTiming(animatedTiming)({
				circleSharedValue,
				containerSharedValue
			}),
		[animatedTiming, circleSharedValue, containerSharedValue]
	)

	useEffect(() => {
		onProgressActiveIndicatorCircularAnimatedTiming(2)
	}, [onProgressActiveIndicatorCircularAnimatedTiming])

	return {containerAnimatedStyle, circleAnimatedProps}
}
