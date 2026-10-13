import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useAnimatedTiming, useTheme} from '../../../hooks'
import {animateSearchBorderRadius, animateSearchColor} from './Search-text-input.handler'
import type {UseSearchTextInputAnimatedOptions} from './Search-text-input.interface'
import {hexToRGBA, RADIUS} from '../../../theme'

export const useSearchTextInputAnimated = ({disabled, expanded}: UseSearchTextInputAnimatedOptions) => {
	const {token} = useTheme()
	const animatedTiming = useAnimatedTiming({token})
	const animatedValue = disabled ? 0 : 1
	const borderBottomRadiusSharedValue = useSharedValue(1)
	const borderTopRadiusSharedValue = useSharedValue(1)
	const colorSharedValue = useSharedValue(animatedValue)
	const disabledBackgroundColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level2)
	const disabledColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level5)
	const backgroundSharedValueOutputRanges = [
		disabledBackgroundColor,
		hexToRGBA(token.scheme.surfaceContainerHigh)(token.opacity.level10)
	]

	const borderBottomRadiusOutputRanges = [token.shape.radius[RADIUS.NONE], token.shape.radius[RADIUS.XX_LARGE]]
	const borderTopRadiusOutputRanges = [token.shape.radius[RADIUS.MEDIUM], token.shape.radius[RADIUS.XX_LARGE]]
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

	const inputColorSharedValueOutputRanges = [disabledColor, hexToRGBA(token.scheme.onSurface)(token.opacity.level10)]
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
