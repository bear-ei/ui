import {useEffect, useMemo} from 'react'
import {Gesture} from 'react-native-gesture-handler'
import {cancelAnimation, runOnJS, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useWindowDimensions} from '../../hooks'
import {updatePrevTranslation, updateTranslation} from './Drag.handler'
import type {UseDragAnimatedOptions} from './Drag.interface'

export const useDragAnimated = ({
	width: rawWidth,
	height: rawHeight,
	onUpdate,
	onEnd,
	onStart
}: UseDragAnimatedOptions) => {
	const {width: screenWidth, height: screenHeight} = useWindowDimensions()
	const height = rawHeight ?? screenHeight
	const prevTranslationXSharedValue = useSharedValue(0)
	const prevTranslationYSharedValue = useSharedValue(0)
	const theme = useTheme()
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

	const panGesture = Gesture.Pan()
		.minDistance(1)
		.onStart(onPanGestureStart)
		.onUpdate(onPanGestureUpdate)
		.onEnd(event => {
			'worklet'

			if (onEnd) {
				runOnJS(onEnd)(event)
			}
		})

	useEffect(
		() => () => {
			cancelAnimation(translateXSharedValue)
			cancelAnimation(translateYSharedValue)
		},
		[translateXSharedValue, translateYSharedValue]
	)

	return {animatedStyle, panGesture}
}
