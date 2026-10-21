import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import {useAnimatedTiming, useTheme} from '../../../hooks'
import {hexToRGBA, RADIUS} from '../../../theme'

import {animateSearchBorderRadius, animateSearchColor} from './Search-text-input.handler'
import type {UseSearchTextInputAnimatedOptions} from './Search-text-input.interface'

export const useSearchTextInputAnimated = ({disabled, expanded}: UseSearchTextInputAnimatedOptions) => {
	const {token} = useTheme()
	const animatedTiming = useAnimatedTiming()
	const animatedValue = disabled ? 0 : 1
	const borderBottomRadiusSharedValue = useSharedValue(1)
	const borderTopRadiusSharedValue = useSharedValue(1)
	const colorSharedValue = useSharedValue(animatedValue)
	const disabledBackgroundColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level2)
	const disabledColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level5)
	const backgroundSharedValueOutputRanges = useMemo(
		() => [disabledBackgroundColor, hexToRGBA(token.scheme.surfaceContainerHigh)(token.opacity.level10)],
		[disabledBackgroundColor, token]
	)

	const borderBottomRadiusOutputRanges = useMemo(
		() => [token.shape.radius[RADIUS.NONE], token.shape.radius[RADIUS.XX_LARGE]],
		[token]
	)

	const borderTopRadiusOutputRanges = useMemo(
		() => [token.shape.radius[RADIUS.MEDIUM], token.shape.radius[RADIUS.XX_LARGE]],
		[token]
	)

	const contentAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(colorSharedValue.value, [0, 1], backgroundSharedValueOutputRanges),
		borderBottomLeftRadius: interpolate(
			borderBottomRadiusSharedValue.value,
			[0, 1],
			borderBottomRadiusOutputRanges
		),
		borderBottomRightRadius: interpolate(
			borderBottomRadiusSharedValue.value,
			[0, 1],
			borderBottomRadiusOutputRanges
		),
		borderTopLeftRadius: interpolate(borderTopRadiusSharedValue.value, [0, 1], borderTopRadiusOutputRanges),
		borderTopRightRadius: interpolate(borderTopRadiusSharedValue.value, [0, 1], borderTopRadiusOutputRanges)
	}))

	const inputColorSharedValueOutputRanges = useMemo(
		() => [disabledColor, hexToRGBA(token.scheme.onSurface)(token.opacity.level10)],
		[disabledColor, token]
	)

	const inputAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(colorSharedValue.value, [0, 1], inputColorSharedValueOutputRanges)
	}))

	const runColorAnimate = useMemo(
		() => animateSearchColor(animatedTiming)(colorSharedValue),
		[animatedTiming, colorSharedValue]
	)

	const runBorderRadiusAnimate = useMemo(
		() => animateSearchBorderRadius(animatedTiming)({borderBottomRadiusSharedValue, borderTopRadiusSharedValue}),
		[animatedTiming, borderBottomRadiusSharedValue, borderTopRadiusSharedValue]
	)

	useEffect(() => {
		runColorAnimate(disabled)
	}, [runColorAnimate, disabled])

	useEffect(() => {
		runBorderRadiusAnimate(expanded)
	}, [runBorderRadiusAnimate, expanded])

	useEffect(
		() => () => {
			cancelAnimation(borderBottomRadiusSharedValue)
			cancelAnimation(borderTopRadiusSharedValue)
			cancelAnimation(colorSharedValue)
		},
		[colorSharedValue, borderBottomRadiusSharedValue, borderTopRadiusSharedValue]
	)

	return {contentAnimatedStyle, inputAnimatedStyle}
}
