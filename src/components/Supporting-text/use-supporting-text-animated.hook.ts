import {useAnimatedTiming, useTheme} from '@/hooks'
import {hexToRGBA} from '@bearei/theme-token'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {animateSupportingText} from './Supporting-text.handler'
import type {UseSupportingTextOptions} from './Supporting-text.interface'

export const useSupportingTextAnimated = ({disabled, error}: UseSupportingTextOptions) => {
	const theme = useTheme()
	const {scheme, opacity} = theme.token
	const disabledAnimatedValue = disabled ? 0 : 1
	const defaultAnimatedValue = error ? 2 : 1
	const value = disabled ? disabledAnimatedValue : defaultAnimatedValue
	const supportingTextSharedValue = useSharedValue(value)
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
	const disabledColor = hexToRGBA(scheme.onSurface)(opacity.level5)
	const supportingTextSharedValueColorOutputRanges = [
		disabledColor,
		hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
		hexToRGBA(scheme.error)(opacity.level10)
	]

	const textAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(supportingTextSharedValue.value, [0, 1, 2], supportingTextSharedValueColorOutputRanges)
	}))

	const runAnimate = useMemo(
		() => animateSupportingText(animateSharedValueTo)(supportingTextSharedValue),
		[animateSharedValueTo, supportingTextSharedValue]
	)

	useEffect(() => {
		runAnimate(value)
	}, [runAnimate, value])

	useEffect(
		() => () => {
			cancelAnimation(supportingTextSharedValue)
		},
		[supportingTextSharedValue]
	)

	return {textAnimatedStyle}
}
