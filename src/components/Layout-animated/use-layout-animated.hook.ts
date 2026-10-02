import {useEffect, useMemo} from 'react'
import type {ViewStyle} from 'react-native'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {COMPONENT_STATUS} from '../../constants'
import {useAnimatedTiming, useTheme} from '../../hooks'
import {debounce, platformValue} from '../../utils'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import {animateLayoutAnimated} from './Layout-animated.handler'
import type {UseLayoutAnimatedOptions} from './Layout-animated.interface'
import {SIZE} from '../../theme'

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
	translate,
	visible,
	width = 0
}: UseLayoutAnimatedOptions) => {
	const containerSharedValue = useSharedValue(visible ? 1 : 0)
	const {token} = useTheme()
	const opacity = rawOpacity ?? token.opacity.level10
	const animatedTiming = useAnimatedTiming({token})
	const animateLayoutAnimatedOptions = useMemo(
		() => ({animatedType, animatedTiming, entry, exit, onAnimationFinished}),
		[animatedTiming, entry, exit, onAnimationFinished, animatedType]
	)

	const opacityOutputRanges = [token.opacity.level0, opacity]
	const fadeAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(containerSharedValue.value, [0, 1], opacityOutputRanges)
	}))

	const widthOutputRanges = [token.density.layout[SIZE.NONE], width]
	const transformXOutputRanges = outputRanges ?? [width, token.density.layout[SIZE.NONE]]
	const collapseXAnimatedStyle = useAnimatedStyle(
		() =>
			({
				...(scale && {
					transform: [{scaleX: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]
				}),
				...(translate && {
					transform: [
						{
							translateX: platformValue(
								interpolate(containerSharedValue.value, [0, 1], transformXOutputRanges)
							)
						}
					]
				}),
				width: platformValue(
					translate ? width : interpolate(containerSharedValue.value, [0, 1], widthOutputRanges)
				)
			}) as ViewStyle
	)

	const heightOutputRanges = [token.density.layout[SIZE.NONE], height]
	const transformYOutputRanges = outputRanges ?? [height, token.density.layout[SIZE.NONE]]
	const collapseYAnimatedStyle = useAnimatedStyle(
		() =>
			({
				...(scale && {transform: [{scaleY: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]}),
				...(translate && {
					transform: [
						{
							translateY: platformValue(
								interpolate(containerSharedValue.value, [0, 1], transformYOutputRanges)
							)
						}
					]
				}),
				height: platformValue(
					translate ? height : interpolate(containerSharedValue.value, [0, 1], heightOutputRanges)
				)
			}) as ViewStyle
	)

	const scaleAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{scale: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]
	}))

	const containerAnimatedTypeStyle = {
		[LAYOUT_ANIMATED.COLLAPSE_X_AND_FADE]: [collapseXAnimatedStyle, fadeAnimatedStyle],
		[LAYOUT_ANIMATED.COLLAPSE_X]: collapseXAnimatedStyle,
		[LAYOUT_ANIMATED.COLLAPSE_Y_AND_FADE]: [collapseYAnimatedStyle, fadeAnimatedStyle],
		[LAYOUT_ANIMATED.COLLAPSE_Y]: collapseYAnimatedStyle,
		[LAYOUT_ANIMATED.FADE]: fadeAnimatedStyle,
		[LAYOUT_ANIMATED.SCALE]: scaleAnimatedStyle,
		[LAYOUT_ANIMATED.STANDARD]: undefined
	}

	const runAnimate = useMemo(
		() =>
			animatedType !== LAYOUT_ANIMATED.STANDARD ?
				debounce(animateLayoutAnimated(animateLayoutAnimatedOptions)(containerSharedValue))(delay)
			:	animateLayoutAnimated(animateLayoutAnimatedOptions)(containerSharedValue),
		[animateLayoutAnimatedOptions, containerSharedValue, delay, animatedType]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimate(visible)
		}
	}, [animatedType, runAnimate, status, visible])

	useEffect(
		() => () => {
			cancelAnimation(containerSharedValue)
		},
		[containerSharedValue]
	)

	return {containerAnimatedStyle: containerAnimatedTypeStyle[animatedType]}
}
