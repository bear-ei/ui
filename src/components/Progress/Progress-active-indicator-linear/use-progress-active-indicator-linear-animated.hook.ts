import {useEffect, useMemo} from 'react'
import {cancelAnimation, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {debounce} from '../../../utils'
import {animateProgressActiveIndicatorLinear} from './Progress-active-indicator-linear.handler'
import type {UseProgressActiveIndicatorLinearAnimatedOptions} from './Progress-active-indicator-linear.interface'

export const useProgressActiveIndicatorLinearAnimated = ({
	defaultValue = 0,
	value
}: UseProgressActiveIndicatorLinearAnimatedOptions) => {
	const scaleXSharedValue = useSharedValue(defaultValue)
	const theme = useTheme()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const createSharedValueAnimator = useMemo(() => animatedTiming(), [animatedTiming])
	const contentAnimatedStyle = useAnimatedStyle(() => ({transform: [{scaleX: scaleXSharedValue.value}]}))
	const runAnimate = useMemo(
		() => debounce(animateProgressActiveIndicatorLinear(createSharedValueAnimator)(scaleXSharedValue))(50),
		[createSharedValueAnimator, scaleXSharedValue]
	)

	useEffect(() => {
		runAnimate(value)
	}, [runAnimate, value])

	useEffect(
		() => () => {
			cancelAnimation(scaleXSharedValue)
		},
		[scaleXSharedValue]
	)

	return {contentAnimatedStyle}
}
