import type {ViewStyle} from 'react-native'

import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseLayoutAnimatedOptions} from './Layout-animated.interface'

import {COMPONENT_STATUS} from '../../constants'
import {useAnimatedTiming, useTheme} from '../../hooks'
import {DENSITY_SIZE} from '../../theme'
import {debounce, platformValue} from '../../utils'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import {animateLayoutAnimated} from './Layout-animated.handler'

export const useLayoutAnimated = ({
	animatedType = LAYOUT_ANIMATED.FADE,
	delay = 30,
	entry,
	exit,
	height = 0,
	onAnimationFinished,
	opacity: rawOpacity,
	outputRanges,
	scale,
	status,
	translate = true,
	visible,
	width = 0
}: UseLayoutAnimatedOptions) => {
	const {token} = useTheme()
	const {density, opacity} = token
	const containerSharedValue = useSharedValue(visible ? 1 : 0)
	const animatedTiming = useAnimatedTiming()
	const animateLayoutAnimatedOptions = useMemo(
		() => ({animatedTiming, animatedType, entry, exit, onAnimationFinished}),
		[animatedTiming, entry, exit, onAnimationFinished, animatedType]
	)

	const opacityOutputRanges = useMemo(() => [opacity.level0, rawOpacity ?? opacity.level10], [opacity, rawOpacity])
	const fadeAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(containerSharedValue.value, [0, 1], opacityOutputRanges)
	}))

	const widthOutputRanges = useMemo(() => [density.layout[DENSITY_SIZE.NONE], width], [density, width])
	const transformXOutputRanges = useMemo(
		() => outputRanges ?? [width, density.layout[DENSITY_SIZE.NONE]],
		[outputRanges, density, width]
	)

	const collapseXAnimatedStyle = useAnimatedStyle(() => {
		const transforms = []

		if (scale) {
			transforms.push({scaleX: interpolate(containerSharedValue.value, [0, 1], [0, 1])})
		}

		if (translate) {
			transforms.push({
				translateX: platformValue(interpolate(containerSharedValue.value, [0, 1], transformXOutputRanges))
			})
		}

		return {
			...(transforms.length && {transform: transforms}),
			width: platformValue(translate ? width : interpolate(containerSharedValue.value, [0, 1], widthOutputRanges))
		} as ViewStyle
	})

	const heightOutputRanges = useMemo(() => [density.layout[DENSITY_SIZE.NONE], height], [height, density])
	const transformYOutputRanges = useMemo(
		() => outputRanges ?? [height, density.layout[DENSITY_SIZE.NONE]],
		[height, outputRanges, density]
	)

	const collapseYAnimatedStyle = useAnimatedStyle(() => {
		const transforms = []

		if (scale) {
			transforms.push({scaleY: interpolate(containerSharedValue.value, [0, 1], [0, 1])})
		}

		if (translate) {
			transforms.push({
				translateY: platformValue(interpolate(containerSharedValue.value, [0, 1], transformYOutputRanges))
			})
		}

		return {
			...(transforms.length && {transform: transforms}),
			height: platformValue(
				translate ? height : interpolate(containerSharedValue.value, [0, 1], heightOutputRanges)
			)
		} as ViewStyle
	})

	const scaleAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{scale: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]
	}))

	const containerAnimatedTypeStyle = useMemo(
		() => ({
			[LAYOUT_ANIMATED.COLLAPSE_X]: collapseXAnimatedStyle,
			[LAYOUT_ANIMATED.COLLAPSE_X_AND_FADE]: [collapseXAnimatedStyle, fadeAnimatedStyle],
			[LAYOUT_ANIMATED.COLLAPSE_Y]: collapseYAnimatedStyle,
			[LAYOUT_ANIMATED.COLLAPSE_Y_AND_FADE]: [collapseYAnimatedStyle, fadeAnimatedStyle],
			[LAYOUT_ANIMATED.FADE]: fadeAnimatedStyle,
			[LAYOUT_ANIMATED.NONE]: undefined,
			[LAYOUT_ANIMATED.SCALE]: scaleAnimatedStyle
		}),
		[collapseXAnimatedStyle, fadeAnimatedStyle, scaleAnimatedStyle, collapseYAnimatedStyle]
	)

	// Debounce absorbs rapid `visible` toggles (e.g., parent re-renders causing flicker).
	// 30ms is below the perceptual threshold for animation-start latency.
	const runAnimate = useMemo(
		() =>
			(animatedType !== LAYOUT_ANIMATED.NONE ?
				debounce(animateLayoutAnimated(containerSharedValue, animateLayoutAnimatedOptions), delay)
			:	animateLayoutAnimated(containerSharedValue, animateLayoutAnimatedOptions)) as {
				(visible?: boolean | undefined): void
				cancel?: () => void
			},
		[animateLayoutAnimatedOptions, containerSharedValue, delay, animatedType]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimate(visible)
		}

		return () => runAnimate.cancel?.()
	}, [animatedType, runAnimate, status, visible])

	useEffect(() => () => cancelAnimation(containerSharedValue), [containerSharedValue])

	return {containerAnimatedStyle: containerAnimatedTypeStyle[animatedType]}
}
