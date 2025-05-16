import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {animateProgressActiveIndicatorLinear, generateStepPositions} from './Progress-active-indicator-linear.handler'
import type {UseProgressActiveIndicatorLinearAnimatedOptions} from './Progress-active-indicator-linear.interface'

export const useProgressActiveIndicatorLinearAnimated = ({
	containerLayout,
	defaultValue = 0,
	increment = 1,
	value
}: UseProgressActiveIndicatorLinearAnimatedOptions) => {
	const widthSharedValue = useSharedValue(defaultValue)
	const theme = useTheme()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const outputRanges = useMemo(
		() => generateStepPositions(containerLayout?.width)(increment),
		[containerLayout?.width, increment]
	)

	const inputRanges = useMemo(() => outputRanges.map((_value, index) => index), [outputRanges])
	const contentAnimatedStyle = useAnimatedStyle(() => ({
		width: interpolate(widthSharedValue.value, inputRanges, outputRanges)
	}))

	const runAnimateProgressActiveIndicatorLinearEffect = useMemo(
		() => animateProgressActiveIndicatorLinear(animatedTiming)(widthSharedValue),
		[animatedTiming, widthSharedValue]
	)

	useEffect(() => {
		runAnimateProgressActiveIndicatorLinearEffect(value)
	}, [runAnimateProgressActiveIndicatorLinearEffect, value])

	return {contentAnimatedStyle}
}
