import {useEffect, useMemo} from 'react'
import {Gesture, MouseButton} from 'react-native-gesture-handler'
import {cancelAnimation, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming, useWindowDimensions} from '../../hooks'
import {animateDrag, handlePanGestureEnd, updatePrevTranslation, updateTranslation} from './Drag.handler'
import type {UseDragAnimatedOptions} from './Drag.interface'

export const useDragAnimated = ({
	height: rawHeight,
	onEnd,
	onStart,
	onUpdate,
	width: rawWidth
}: UseDragAnimatedOptions) => {
	const {width: screenWidth, height: screenHeight} = useWindowDimensions()
	const theme = useTheme()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
	const height = rawHeight ?? screenHeight
	const prevTranslationXSharedValue = useSharedValue(0)
	const prevTranslationYSharedValue = useSharedValue(0)
	const translateXSharedValue = useSharedValue(0)
	const translateYSharedValue = useSharedValue(0)
	const width = rawWidth ?? screenWidth
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{translateX: translateXSharedValue.value}, {translateY: translateYSharedValue.value}]
	}))

	const onPanGestureStart = useMemo(
		() =>
			updatePrevTranslation({prevTranslationXSharedValue, prevTranslationYSharedValue, onStart})({
				translateXSharedValue,
				translateYSharedValue
			}),
		[
			onStart,
			prevTranslationXSharedValue,
			prevTranslationYSharedValue,
			translateXSharedValue,
			translateYSharedValue
		]
	)

	const onPanGestureUpdate = useMemo(
		() =>
			updateTranslation({width, height, theme, onUpdate})({
				prevTranslationXSharedValue,
				prevTranslationYSharedValue,
				translateXSharedValue,
				translateYSharedValue
			}),
		[
			height,
			onUpdate,
			prevTranslationXSharedValue,
			prevTranslationYSharedValue,
			theme,
			translateXSharedValue,
			translateYSharedValue,
			width
		]
	)

	const runAnimate = useMemo(
		() => animateDrag(animateSharedValueTo)({translateXSharedValue, translateYSharedValue}),
		[animateSharedValueTo, translateXSharedValue, translateYSharedValue]
	)

	const onPanGestureEnd = useMemo(() => handlePanGestureEnd(onEnd)(runAnimate), [onEnd, runAnimate])
	const panGesture = useMemo(
		() =>
			Gesture.Pan()
				.minDistance(24)
				.mouseButton(MouseButton.LEFT)
				.onStart(onPanGestureStart)
				.onUpdate(onPanGestureUpdate)
				.onEnd(onPanGestureEnd),
		[onPanGestureEnd, onPanGestureStart, onPanGestureUpdate]
	)

	useEffect(
		() => () => {
			cancelAnimation(translateXSharedValue)
			cancelAnimation(translateYSharedValue)
		},
		[translateXSharedValue, translateYSharedValue]
	)

	return {animatedStyle, panGesture}
}
