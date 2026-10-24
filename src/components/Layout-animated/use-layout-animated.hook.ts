import type {ViewStyle} from 'react-native'

import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseLayoutAnimatedOptions} from './Layout-animated.interface'

import {COMPONENT_STATUS} from '../../constants'
import {useAnimatedTiming, useTheme} from '../../hooks'
import {DENSITY_SIZE} from '../../theme'
import {debounce, toPlatformUnit} from '../../utils'
import {LAYOUT_ANIMATION} from './Layout-animated.enum'
import {animateLayoutAnimated} from './Layout-animated.handler'

export const useLayoutAnimated = ({
	animation = LAYOUT_ANIMATION.FADE,
	debounceDelay = 30,
	entry,
	exit,
	height = 0,
	onAnimationFinished,
	opacity: rawOpacity,
	outputRanges,
	scaleOnCollapse,
	status,
	translateOnCollapse = true,
	visible,
	width = 0
}: UseLayoutAnimatedOptions) => {
	const {token} = useTheme()
	const {density, opacity} = token
	const containerSharedValue = useSharedValue(visible ? 1 : 0)
	const animatedTiming = useAnimatedTiming()
	const animateLayoutAnimatedOptions = useMemo(
		() => ({animation, entry, exit, onAnimationFinished}),
		[entry, exit, onAnimationFinished, animation]
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

		if (scaleOnCollapse) {
			transforms.push({scaleX: interpolate(containerSharedValue.value, [0, 1], [0, 1])})
		}

		if (translateOnCollapse) {
			transforms.push({
				translateX: toPlatformUnit(interpolate(containerSharedValue.value, [0, 1], transformXOutputRanges))
			})
		}

		return {
			...(transforms.length && {transform: transforms}),
			width: toPlatformUnit(
				translateOnCollapse ? width : interpolate(containerSharedValue.value, [0, 1], widthOutputRanges)
			)
		} as ViewStyle
	})

	const heightOutputRanges = useMemo(() => [density.layout[DENSITY_SIZE.NONE], height], [height, density])
	const transformYOutputRanges = useMemo(
		() => outputRanges ?? [height, density.layout[DENSITY_SIZE.NONE]],
		[height, outputRanges, density]
	)

	const collapseYAnimatedStyle = useAnimatedStyle(() => {
		const transforms = []

		if (scaleOnCollapse) {
			transforms.push({scaleY: interpolate(containerSharedValue.value, [0, 1], [0, 1])})
		}

		if (translateOnCollapse) {
			transforms.push({
				translateY: toPlatformUnit(interpolate(containerSharedValue.value, [0, 1], transformYOutputRanges))
			})
		}

		return {
			...(transforms.length && {transform: transforms}),
			height: toPlatformUnit(
				translateOnCollapse ? height : interpolate(containerSharedValue.value, [0, 1], heightOutputRanges)
			)
		} as ViewStyle
	})

	const scaleAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{scale: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]
	}))

	const containerAnimationStyleByType = useMemo(
		() => ({
			[LAYOUT_ANIMATION.COLLAPSE_X]: collapseXAnimatedStyle,
			[LAYOUT_ANIMATION.COLLAPSE_X_AND_FADE]: [collapseXAnimatedStyle, fadeAnimatedStyle],
			[LAYOUT_ANIMATION.COLLAPSE_Y]: collapseYAnimatedStyle,
			[LAYOUT_ANIMATION.COLLAPSE_Y_AND_FADE]: [collapseYAnimatedStyle, fadeAnimatedStyle],
			[LAYOUT_ANIMATION.FADE]: fadeAnimatedStyle,
			[LAYOUT_ANIMATION.NONE]: undefined,
			[LAYOUT_ANIMATION.SCALE]: scaleAnimatedStyle
		}),
		[collapseXAnimatedStyle, fadeAnimatedStyle, scaleAnimatedStyle, collapseYAnimatedStyle]
	)

	// Debounce absorbs rapid `visible` toggles (e.g., parent re-renders causing flicker).
	// 30ms is below the perceptual threshold for animation-start latency.
	const runAnimate = useMemo(
		() =>
			(animation !== LAYOUT_ANIMATION.NONE ?
				debounce(
					animateLayoutAnimated(containerSharedValue, animatedTiming, animateLayoutAnimatedOptions),
					debounceDelay
				)
			:	animateLayoutAnimated(containerSharedValue, animatedTiming, animateLayoutAnimatedOptions)) as {
				(visible?: boolean | undefined): void
				cancel?: () => void
			},
		[animateLayoutAnimatedOptions, containerSharedValue, debounceDelay, animation, animatedTiming]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimate(visible)
		}

		return () => runAnimate.cancel?.()
	}, [animation, runAnimate, status, visible])

	useEffect(() => () => cancelAnimation(containerSharedValue), [containerSharedValue])

	return {containerAnimatedStyle: containerAnimationStyleByType[animation]}
}
