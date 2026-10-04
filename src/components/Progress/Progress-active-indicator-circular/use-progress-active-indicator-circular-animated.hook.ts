import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedProps, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {COMPONENT_STATUS} from '../../../constants'
import {useAnimatedTiming, useTheme} from '../../../hooks'
import {
	animateProgressActiveIndicatorCircular,
	computeProgressStrokeDashoffset
} from './Progress-active-indicator-circular.handler'
import type {UseProgressActiveIndicatorCircularAnimatedOptions} from './Progress-active-indicator-circular.interface'
import {platformValue} from '../../../utils'

export const useProgressActiveIndicatorCircularAnimated = ({
	circumference,
	enableAnimated,
	status
}: UseProgressActiveIndicatorCircularAnimatedOptions) => {
	const {token} = useTheme()
	const animatedTiming = useAnimatedTiming({token})
	const circleSharedValue = useSharedValue(0)
	const containerSharedValue = useSharedValue(0)
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{rotate: `${interpolate(containerSharedValue.value, [0, 1, 2], [0, 360, 720])}deg`}]
	}))

	const circleStrokeDashoffsetOutputRanges = [
		computeProgressStrokeDashoffset(circumference)(0.1),
		computeProgressStrokeDashoffset(circumference)(0.8),
		computeProgressStrokeDashoffset(circumference)(0.1)
	]

	const circleAnimatedProps = useAnimatedProps(() => ({
		strokeDashoffset: platformValue(
			interpolate(circleSharedValue.value, [0, 1, 2], circleStrokeDashoffsetOutputRanges)
		)
	}))

	const runAnimate = useMemo(
		() => animateProgressActiveIndicatorCircular(animatedTiming)({circleSharedValue, containerSharedValue}),
		[animatedTiming, circleSharedValue, containerSharedValue]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimate(enableAnimated)
		}
	}, [enableAnimated, runAnimate, status])

	useEffect(
		() => () => {
			cancelAnimation(circleSharedValue)
			cancelAnimation(containerSharedValue)
		},
		[circleSharedValue, containerSharedValue]
	)

	return {containerAnimatedStyle, circleAnimatedProps}
}
