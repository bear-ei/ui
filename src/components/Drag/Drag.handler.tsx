import type {LayoutChangeEvent} from 'react-native'
import type {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import {scheduleOnRN} from 'react-native-worklets'

import type {AnimatedTiming, HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import type {DragState, UpdatePrevTranslateSharedValueOptions, UpdateTranslateScreenOptions} from './Drag.interface'

import {EVENT_NAME, LAYOUT, type LayoutRectangle} from '../../constants'
import {DURATION, EASING} from '../../theme'

export const updateDragLayout =
	(setState: Updater<DragState>) =>
	({height, width}: LayoutRectangle) =>
		setState(draft => {
			if (draft.layout.width !== width || draft.layout.height !== height) {
				draft.layout.width = width
				draft.layout.height = height
			}
		})

export const handleDragStateChange = (
	event: StateEvent,
	onLayoutChange: (layout: LayoutRectangle) => void,
	{eventName}: HandleStateEventChangeOptions
) => {
	if (eventName !== EVENT_NAME.LAYOUT) {
		return
	}

	onLayoutChange((event as LayoutChangeEvent).nativeEvent.layout as LayoutRectangle)
}

export const updatePrevTranslate =
	(
		[prevTranslateXSharedValue, prevTranslateYSharedValue]: [SharedValue<number>, SharedValue<number>],
		[translateXSharedValue, translateYSharedValue]: [SharedValue<number>, SharedValue<number>],
		{onStart}: UpdatePrevTranslateSharedValueOptions
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
export const updateTranslate = (
	[prevTranslateXSharedValue, prevTranslateYSharedValue]: [SharedValue<number>, SharedValue<number>],
	[translateXSharedValue, translateYSharedValue]: [SharedValue<number>, SharedValue<number>],
	{height, layout, layoutType = LAYOUT.VERTICAL, offset, onUpdate, width}: UpdateTranslateScreenOptions
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

		translateXSharedValue.value = layoutType === LAYOUT.HORIZONTAL ? clampedX - offsetX : minTranslateX
		translateYSharedValue.value = layoutType === LAYOUT.VERTICAL ? clampedY - offsetY : minTranslateY

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

const ANIMATED_TIMING_OPTIONS = {duration: DURATION.SHORT_2, easing: EASING.STANDARD}
export const animateDrag = (
	[translateXSharedValue, translateYSharedValue]: [SharedValue<number>, SharedValue<number>],
	animatedTiming: AnimatedTiming
) => {
	const translateXAnimateSharedValueTo = animatedTiming(translateXSharedValue, ANIMATED_TIMING_OPTIONS)
	const translateYAnimateSharedValueTo = animatedTiming(translateYSharedValue, ANIMATED_TIMING_OPTIONS)

	return () => {
		translateXAnimateSharedValueTo(0)
		translateYAnimateSharedValueTo(0)
	}
}
