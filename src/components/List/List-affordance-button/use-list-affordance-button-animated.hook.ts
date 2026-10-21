import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import {useAnimatedTiming, useTheme} from '../../../hooks'
import {hexToRGBA} from '../../../theme'

import {animateListAffordanceButton} from './List-affordance-button.handler'
import type {UseListAffordanceButtonAnimatedOptions} from './List-affordance-button.interface'

export const useListAffordanceButtonAnimated = ({
	backgroundVisible,
	disabled
}: UseListAffordanceButtonAnimatedOptions) => {
	const {token} = useTheme()
	const animatedTiming = useAnimatedTiming()
	const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
	const disabledValue = disabled ? 0 : 1
	const animatedValue = backgroundVisible ? 2 : disabledValue
	const colorSharedValue = useSharedValue(animatedValue)
	const disabledBackgroundColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level2)
	const disabledColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level5)
	const backgroundColorOutputRanges = useMemo(
		() => [
			disabledBackgroundColor,
			hexToRGBA(token.scheme.primary)(token.opacity.level0),
			hexToRGBA(token.scheme.primary)(token.opacity.level10)
		],
		[disabledBackgroundColor, token]
	)

	const colorOutputRanges = useMemo(
		() => [
			disabledColor,
			hexToRGBA(token.scheme.onPrimary)(token.opacity.level10),
			hexToRGBA(token.scheme.onPrimary)(token.opacity.level10)
		],
		[disabledColor, token]
	)

	const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(colorSharedValue.value, [0, 1, 2], backgroundColorOutputRanges)
	}))

	const labelTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(colorSharedValue.value, [0, 1, 2], colorOutputRanges)
	}))

	const runAnimate = useMemo(
		() => animateListAffordanceButton(animateSharedValueTo)(colorSharedValue),
		[animateSharedValueTo, colorSharedValue]
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
