import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseSupportingTextOptions} from './Supporting-text.interface'

import {useAnimatedTiming, useTheme} from '../../hooks'
import {hexToRGBA} from '../../theme'
import {animateSupportingText} from './Supporting-text.handler'

export const useSupportingTextAnimated = ({disabled, error}: UseSupportingTextOptions) => {
	const {token} = useTheme()
	const {opacity, scheme} = token
	const defaultAnimatedValue = error ? 2 : 1
	const value = disabled ? 0 : defaultAnimatedValue
	const supportingTextSharedValue = useSharedValue(value)
	const animatedTiming = useAnimatedTiming()
	const disabledColor = hexToRGBA(scheme.onSurface, opacity.level5)
	const supportingTextSharedValueColorOutputRanges = useMemo(
		() => [
			disabledColor,
			hexToRGBA(scheme.onSurfaceVariant, opacity.level10),
			hexToRGBA(scheme.error, opacity.level10)
		],
		[disabledColor, scheme, opacity]
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
