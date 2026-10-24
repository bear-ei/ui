import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseSupportingTextAnimatedOptions} from './Supporting-text.interface'

import {useAnimatedTiming, useTheme} from '../../hooks'
import {hexToRGBA} from '../../theme'
import {animateSupportingText} from './Supporting-text.handler'

export const useSupportingTextAnimated = ({disabled, error}: UseSupportingTextAnimatedOptions) => {
	const {token} = useTheme()
	const {colors, opacity} = token
	const defaultAnimatedValue = error ? 2 : 1
	const value = disabled ? 0 : defaultAnimatedValue
	const supportingTextSharedValue = useSharedValue(value)
	const animatedTiming = useAnimatedTiming()
	const disabledColor = hexToRGBA(colors.onSurface, opacity.level5)
	const supportingTextSharedValueColorOutputRanges = useMemo(
		() => [
			disabledColor,
			hexToRGBA(colors.onSurfaceVariant, opacity.level10),
			hexToRGBA(colors.error, opacity.level10)
		],
		[disabledColor, colors, opacity]
	)

	const textAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(supportingTextSharedValue.value, [0, 1, 2], supportingTextSharedValueColorOutputRanges)
	}))

	const runAnimate = useMemo(
		() => animateSupportingText(supportingTextSharedValue, animatedTiming),
		[animatedTiming, supportingTextSharedValue]
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
