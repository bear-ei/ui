import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseListAffordanceButtonAnimatedOptions} from './List-affordance-button.interface'

import {useAnimatedTiming, useTheme} from '../../../hooks'
import {hexToRGBA} from '../../../theme'
import {animateListAffordanceButton} from './List-affordance-button.handler'

export const useListAffordanceButtonAnimated = ({
	backgroundVisible,
	disabled
}: UseListAffordanceButtonAnimatedOptions) => {
	const {token} = useTheme()
	const {opacity, scheme} = token
	const animatedTiming = useAnimatedTiming()
	const disabledValue = disabled ? 0 : 1
	const animatedValue = backgroundVisible ? 2 : disabledValue
	const colorSharedValue = useSharedValue(animatedValue)
	const disabledBackgroundColor = hexToRGBA(scheme.onSurface, opacity.level2)
	const disabledColor = hexToRGBA(scheme.onSurface, opacity.level5)
	const backgroundColorOutputRanges = useMemo(
		() => [
			disabledBackgroundColor,
			hexToRGBA(scheme.primary, opacity.level0),
			hexToRGBA(scheme.primary, opacity.level10)
		],
		[disabledBackgroundColor, scheme, opacity]
	)

	const colorOutputRanges = useMemo(
		() => [
			disabledColor,
			hexToRGBA(scheme.onPrimary, opacity.level10),
			hexToRGBA(scheme.onPrimary, opacity.level10)
		],
		[disabledColor, scheme, opacity]
	)

	const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(colorSharedValue.value, [0, 1, 2], backgroundColorOutputRanges)
	}))

	const labelTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(colorSharedValue.value, [0, 1, 2], colorOutputRanges)
	}))

	const runAnimate = useMemo(
		() => animateListAffordanceButton(colorSharedValue, animatedTiming),
		[animatedTiming, colorSharedValue]
	)

	useEffect(() => {
		runAnimate(backgroundVisible ? 2 : disabledValue)
	}, [backgroundVisible, disabledValue, runAnimate])

	useEffect(
		() => () => {
			cancelAnimation(colorSharedValue)
		},
		[colorSharedValue]
	)

	return {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle}
}
