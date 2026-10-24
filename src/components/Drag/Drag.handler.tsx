import type {LayoutChangeEvent} from 'react-native'
import type {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import {scheduleOnRN} from 'react-native-worklets'

import type {AnimatedTimingFactory, HandleInteractionStateChangeOptions, InteractionEvent} from '../../hooks'
import type {DragState, HandlePanGestureStartOptions, HandlePanGestureUpdateOptions} from './Drag.interface'

import {EVENT_NAME, ORIENTATION, type MeasuredLayoutRectangle} from '../../constants'
import {ANIMATED_TIMING} from '../../theme'

export const updateDragLayout =
	(setState: Updater<DragState>) =>
	({height, width}: MeasuredLayoutRectangle) =>
		setState(draft => {
			if (draft.layout.width !== width || draft.layout.height !== height) {
				draft.layout.width = width
				draft.layout.height = height
			}
		})

export const handleDragStateChange = (
	event: InteractionEvent,
	onLayoutChange: (layout: MeasuredLayoutRectangle) => void,
	{eventName}: HandleInteractionStateChangeOptions
) => {
	if (eventName !== EVENT_NAME.LAYOUT) {
		return
	}

	onLayoutChange((event as LayoutChangeEvent).nativeEvent.layout as MeasuredLayoutRectangle)
}

export const handlePanGestureStart =
	(
		[prevTranslateXSharedValue, prevTranslateYSharedValue]: [SharedValue<number>, SharedValue<number>],
		[translateXSharedValue, translateYSharedValue]: [SharedValue<number>, SharedValue<number>],
		{onStart}: HandlePanGestureStartOptions
	) =>
	(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
		'worklet'

		prevTranslateXSharedValue.value = translateXSharedValue.value
		prevTranslateYSharedValue.value = translateYSharedValue.value

		if (onStart) {
			scheduleOnRN(onStart, event)
		}
	}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
export const handlePanGestureUpdate = (
	[prevTranslateXSharedValue, prevTranslateYSharedValue]: [SharedValue<number>, SharedValue<number>],
	[translateXSharedValue, translateYSharedValue]: [SharedValue<number>, SharedValue<number>],
	{height, layout, offset, onUpdate, orientation = ORIENTATION.VERTICAL, width}: HandlePanGestureUpdateOptions
) => {
	const maxTranslateX = width - (layout.width ?? 0)
	const maxTranslateY = height - (layout.height ?? 0)
	const minTranslateX = 0
	const minTranslateY = 0

	return (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
		'worklet'

		const offsetY = typeof offset === 'number' ? offset : prevTranslateYSharedValue.value
		const offsetX = typeof offset === 'number' ? offset : prevTranslateXSharedValue.value
		const nextTranslationX = offsetX + event.translationX
		const nextTranslationY = offsetY + event.translationY
		const clampedX = clamp(nextTranslationX, minTranslateX, maxTranslateX)
		const clampedY = clamp(nextTranslationY, minTranslateY, maxTranslateY)

		translateXSharedValue.value = orientation === ORIENTATION.HORIZONTAL ? clampedX - offsetX : minTranslateX
		translateYSharedValue.value = orientation === ORIENTATION.VERTICAL ? clampedY - offsetY : minTranslateY

		if (onUpdate) {
			scheduleOnRN(onUpdate, event)
		}
	}
}

export const handlePanGestureEnd =
	(onEnd?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void) =>
	(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
		'worklet'

		if (onEnd) {
			scheduleOnRN(onEnd, event)
		}
	}

export const animateDrag = (
	[translateXSharedValue, translateYSharedValue]: [SharedValue<number>, SharedValue<number>],
	animatedTiming: AnimatedTimingFactory
) => {
	const translateXAnimateSharedValueTo = animatedTiming(translateXSharedValue, ANIMATED_TIMING.STANDARD)
	const translateYAnimateSharedValueTo = animatedTiming(translateYSharedValue, ANIMATED_TIMING.STANDARD)

	return () => {
		translateXAnimateSharedValueTo(0)
		translateYAnimateSharedValueTo(0)
	}
}
