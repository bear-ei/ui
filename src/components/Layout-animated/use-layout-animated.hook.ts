import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import type {DefaultStyle} from 'react-native-reanimated/lib/typescript/hook/commonTypes'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import {animateLayoutAnimated} from './Layout-animated.handler'
import type {LayoutAnimatedType, UseLayoutAnimatedOptions} from './Layout-animated.interface'

export const useLayoutAnimated = ({
	animatedType = LAYOUT_ANIMATED.FADE,
	entry,
	exit,
	height,
	onAnimationFinished,
	opacity: rawOpacity,
	scale,
	visible,
	width
}: UseLayoutAnimatedOptions) => {
	const containerSharedValue = useSharedValue(visible ? 1 : 0)
	const theme = useTheme()
	const opacity = rawOpacity ?? theme.token.opacity.level10
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const opacityOutputRanges = useMemo(
		() => [theme.adaptSize(theme.token.spacing.none), opacity],
		[opacity, theme]
	)

	const fadeAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(containerSharedValue.value, [0, 1], opacityOutputRanges)
	}))

	const widthOutputRanges = useMemo(
		() => [theme.adaptSize(theme.token.spacing.none), width ?? theme.adaptSize(theme.token.spacing.none)],
		[theme, width]
	)

	const collapseXAnimatedStyle = useAnimatedStyle(() => ({
		width: interpolate(containerSharedValue.value, [0, 1], widthOutputRanges),
		...(scale && {transform: [{scaleX: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]})
	}))

	const heightOutputRanges = useMemo(
		() => [theme.adaptSize(theme.token.spacing.none), height ?? theme.adaptSize(theme.token.spacing.none)],
		[height, theme]
	)

	const collapseYAnimatedStyle = useAnimatedStyle(() => ({
		height: interpolate(containerSharedValue.value, [0, 1], heightOutputRanges),
		...(scale && {transform: [{scaleY: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]})
	}))

	const scaleAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{scale: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]
	}))

	const animateLayoutAnimatedEffect = useMemo(
		() => animateLayoutAnimated({animatedTiming, entry, exit, onAnimationFinished})(containerSharedValue),
		[animatedTiming, containerSharedValue, entry, exit, onAnimationFinished]
	)

	const containerAnimatedTypeStyle = useMemo(
		() =>
			({
				[LAYOUT_ANIMATED.COLLAPSE_X]: collapseXAnimatedStyle,
				[LAYOUT_ANIMATED.COLLAPSE_Y]: collapseYAnimatedStyle,
				[LAYOUT_ANIMATED.FADE]: fadeAnimatedStyle,
				[LAYOUT_ANIMATED.SCALE]: scaleAnimatedStyle,
				[LAYOUT_ANIMATED.STANDARD]: undefined
			}) as Record<LayoutAnimatedType, DefaultStyle | undefined>,
		[collapseXAnimatedStyle, collapseYAnimatedStyle, fadeAnimatedStyle, scaleAnimatedStyle]
	)

	useEffect(() => {
		animateLayoutAnimatedEffect(visible)
	}, [animateLayoutAnimatedEffect, visible])

	return {containerAnimatedStyle: containerAnimatedTypeStyle[animatedType]}
}
