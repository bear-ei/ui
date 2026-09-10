import {useAnimatedTiming, useTheme, useWindowDimensions} from '@/hooks'
import {platformValue} from '@/utils'
import {useEffect, useMemo} from 'react'
import {Gesture, MouseButton} from 'react-native-gesture-handler'
import {cancelAnimation, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {animateDrag, handlePanGestureEnd, updatePrevTranslate, updateTranslate} from './Drag.handler'
import type {UseDragAnimatedOptions} from './Drag.interface'

export const useDragAnimated = ({
	height: rawHeight,
	layout,
	layoutType,
	offset,
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
	const prevTranslateXSharedValue = useSharedValue(0)
	const prevTranslateYSharedValue = useSharedValue(0)
	const translateXSharedValue = useSharedValue(0)
	const translateYSharedValue = useSharedValue(0)
	const width = rawWidth ?? screenWidth
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{translateX: platformValue(translateXSharedValue.value) as number},
			{translateY: platformValue(translateYSharedValue.value) as number}
		]
	}))

	const onPanGestureStart = useMemo(
		() =>
			updatePrevTranslate({prevTranslateXSharedValue, prevTranslateYSharedValue, onStart})({
				translateXSharedValue,
				translateYSharedValue
			}),
		[onStart, prevTranslateXSharedValue, prevTranslateYSharedValue, translateXSharedValue, translateYSharedValue]
	)

	const onPanGestureUpdate = useMemo(
		() =>
			updateTranslate({width, height, onUpdate, layout, layoutType, offset})({
				prevTranslateXSharedValue,
				prevTranslateYSharedValue,
				translateXSharedValue,
				translateYSharedValue
			}),
		[
			height,
			layout,
			layoutType,
			offset,
			onUpdate,
			prevTranslateXSharedValue,
			prevTranslateYSharedValue,
			translateXSharedValue,
			translateYSharedValue,
			width
		]
	)

	const runAnimate = useMemo(
		() => animateDrag(animateSharedValueTo)({translateXSharedValue, translateYSharedValue}),
		[animateSharedValueTo, translateXSharedValue, translateYSharedValue]
	)

	const onPanGestureEnd = useMemo(() => handlePanGestureEnd(onEnd), [onEnd])
	const panGesture = Gesture.Pan()
		.minDistance(theme.token.spacing.large)
		.mouseButton(MouseButton.LEFT)
		.onStart(onPanGestureStart)
		.onUpdate(onPanGestureUpdate)
		.onEnd(onPanGestureEnd)

	useEffect(() => {
		if (typeof offset === 'number') {
			runAnimate()
		}
	}, [offset, runAnimate])

	useEffect(
		() => () => {
			cancelAnimation(translateXSharedValue)
			cancelAnimation(translateYSharedValue)
		},
		[translateXSharedValue, translateYSharedValue]
	)

	return {animatedStyle, panGesture, runAnimate}
}
