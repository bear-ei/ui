import {useEffect, useMemo} from 'react'
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {animateProgressActiveIndicatorLinear} from './Progress-active-indicator-linear.handler'
import type {UseProgressActiveIndicatorLinearAnimatedOptions} from './Progress-active-indicator-linear.interface'

export const useProgressActiveIndicatorLinearAnimated = ({
	defaultValue = 0,
	value
}: UseProgressActiveIndicatorLinearAnimatedOptions) => {
	const widthSharedValue = useSharedValue(defaultValue)
	const theme = useTheme()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const contentAnimatedStyle = useAnimatedStyle(() => ({transform: [{scaleX: widthSharedValue.value}]}))
	const runAnimate = useMemo(
		() => animateProgressActiveIndicatorLinear(animatedTiming)(widthSharedValue),
		[animatedTiming, widthSharedValue]
	)

	useEffect(() => {
		runAnimate(value)
	}, [runAnimate, value])

	return {contentAnimatedStyle}
}
