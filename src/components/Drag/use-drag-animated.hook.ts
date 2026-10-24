import type {ViewStyle} from 'react-native'

import {useEffect, useMemo} from 'react'
import {Gesture, MouseButton} from 'react-native-gesture-handler'
import {cancelAnimation, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseDragAnimatedOptions} from './Drag.interface'

import {useAnimatedTiming, useTheme, useWindowDimensions} from '../../hooks'
import {DENSITY_SIZE} from '../../theme'
import {toPlatformUnit} from '../../utils'
import {animateDrag, handlePanGestureEnd, handlePanGestureStart, handlePanGestureUpdate} from './Drag.handler'

export const useDragAnimated = ({
	height: rawHeight,
	layout,
	offset,
	onEnd,
	onStart,
	onUpdate,
	orientation,
	width: rawWidth
}: UseDragAnimatedOptions) => {
	const {height: screenHeight, width: screenWidth} = useWindowDimensions()
	const {token} = useTheme()
	const {density} = token
	const animatedTiming = useAnimatedTiming()
	const height = rawHeight ?? screenHeight
	const prevTranslateXSharedValue = useSharedValue(0)
	const prevTranslateYSharedValue = useSharedValue(0)
	const translateXSharedValue = useSharedValue(0)
	const translateYSharedValue = useSharedValue(0)
	const width = rawWidth ?? screenWidth
	const animatedStyle = useAnimatedStyle(
		() =>
			({
				transform: [
					{translateX: toPlatformUnit(translateXSharedValue.value)},
					{translateY: toPlatformUnit(translateYSharedValue.value)}
				]
			}) as ViewStyle
	)

	const onPanGestureStart = useMemo(
		() =>
			handlePanGestureStart(
				[prevTranslateXSharedValue, prevTranslateYSharedValue],
				[translateXSharedValue, translateYSharedValue],
				{onStart}
			),
		[onStart, prevTranslateXSharedValue, prevTranslateYSharedValue, translateXSharedValue, translateYSharedValue]
	)

	const onPanGestureUpdate = useMemo(
		() =>
			handlePanGestureUpdate(
				[prevTranslateXSharedValue, prevTranslateYSharedValue],
				[translateXSharedValue, translateYSharedValue],
				{height, layout, offset, onUpdate, orientation, width}
			),
		[
			height,
			layout,
			orientation,
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
		() => animateDrag([translateXSharedValue, translateYSharedValue], animatedTiming),
		[animatedTiming, translateXSharedValue, translateYSharedValue]
	)

	const onPanGestureEnd = useMemo(() => handlePanGestureEnd(onEnd), [onEnd])
	const panGesture = useMemo(
		() =>
			Gesture.Pan()
				.minDistance(density.spacing[DENSITY_SIZE.SMALL])
				.mouseButton(MouseButton.LEFT)
				.onStart(onPanGestureStart)
				.onUpdate(onPanGestureUpdate)
				.onEnd(onPanGestureEnd),
		[density, onPanGestureStart, onPanGestureUpdate, onPanGestureEnd]
	)

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
