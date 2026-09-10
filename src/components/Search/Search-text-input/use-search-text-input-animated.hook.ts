import {useAnimatedTiming, useTheme} from '@/hooks'
import {hexToRGBA} from '@bearei/theme-token'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {animateSearchBorderRadius, animateSearchColor} from './Search-text-input.handler'
import type {UseSearchTextInputAnimatedOptions} from './Search-text-input.interface'

export const useSearchTextInputAnimated = ({disabled, expanded}: UseSearchTextInputAnimatedOptions) => {
	const theme = useTheme()
	const {scheme, opacity} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animatedValue = disabled ? 0 : 1
	const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
	const borderBottomRadiusSharedValue = useSharedValue(1)
	const borderTopRadiusSharedValue = useSharedValue(1)
	const colorSharedValue = useSharedValue(animatedValue)
	const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2)
	const disabledColor = hexToRGBA(scheme.onSurface)(opacity.level5)
	const backgroundSharedValueOutputRanges = [
		disabledBackgroundColor,
		hexToRGBA(scheme.surfaceContainerHigh)(opacity.level10)
	]

	const borderBottomRadiusOutputRanges = [
		theme.token.spacing.none,
		theme.token.spacing.extraLarge - theme.token.spacing.extraSmall
	]

	const borderTopRadiusOutputRanges = [
		theme.token.spacing.medium - theme.token.spacing.extraSmall,
		theme.token.spacing.extraLarge - theme.token.spacing.extraSmall
	]

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

	const inputColorSharedValueOutputRanges = [disabledColor, hexToRGBA(scheme.onSurface)(opacity.level10)]
	const inputAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(colorSharedValue.value, [0, 1], inputColorSharedValueOutputRanges)
	}))

	const runColorAnimate = useMemo(
		() => animateSearchColor(animateSharedValueTo)(colorSharedValue),
		[animateSharedValueTo, colorSharedValue]
	)

	const runBorderRadiusAnimate = useMemo(
		() =>
			animateSearchBorderRadius(animateSharedValueTo)({
				borderBottomRadiusSharedValue,
				borderTopRadiusSharedValue
			}),
		[animateSharedValueTo, borderBottomRadiusSharedValue, borderTopRadiusSharedValue]
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
