import type {LayoutChangeEvent} from 'react-native'
import type {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import {scheduleOnRN} from 'react-native-worklets'
import type {Updater} from 'use-immer'
import {EVENT_NAME, LAYOUT, type LayoutRectangle} from '../../constants'
import type {AnimatedTimingOptions, AnimateSharedValueTo, HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {DURATION, EASING} from '../../theme'
import type {
	AnimateDragOptions,
	DragState,
	UpdatePrevTranslateSharedValueOptions,
	UpdateTranslateOptions,
	UpdateTranslateScreenOptions,
	UpdateTranslateSharedValueOptions
} from './Drag.interface'

export const updateDragLayout =
	(setState: Updater<DragState>) =>
	({width, height}: LayoutRectangle) =>
		setState(draft => {
			if (draft.layout.width !== width || draft.layout.height !== height) {
				draft.layout.width = width
				draft.layout.height = height
			}
		})

export const handleDragStateChange =
	({eventName}: HandleStateEventChangeOptions) =>
	(onLayoutChange: (layout: LayoutRectangle) => void) =>
	(event: StateEvent) => {
		if (eventName !== EVENT_NAME.LAYOUT) {
			return
		}

		onLayoutChange((event as LayoutChangeEvent).nativeEvent.layout as LayoutRectangle)
	}

export const updatePrevTranslate =
	({prevTranslateXSharedValue, prevTranslateYSharedValue, onStart}: UpdatePrevTranslateSharedValueOptions) =>
	({translateXSharedValue, translateYSharedValue}: UpdateTranslateSharedValueOptions) =>
	(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
		'worklet'

		prevTranslateXSharedValue.value = translateXSharedValue.value
		prevTranslateYSharedValue.value = translateYSharedValue.value

		if (onStart) {
			scheduleOnRN(onStart, event)
		}
	}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
export const updateTranslate = ({
	height,
	layout,
	layoutType = LAYOUT.VERTICAL,
	offset,
	onUpdate,
	width
}: UpdateTranslateScreenOptions) => {
	const maxTranslateX = width - (layout.width ?? 0)
	const maxTranslateY = height - (layout.height ?? 0)
	const minTranslateX = 0
	const minTranslateY = 0

	return ({
			prevTranslateXSharedValue,
			prevTranslateYSharedValue,
			translateXSharedValue,
			translateYSharedValue
		}: UpdateTranslateOptions) =>
		(event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
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

const ANIMATED_TIMING_OPTIONS = {easing: EASING.STANDARD, duration: DURATION.SHORT_2}
export const animateDrag =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	({translateXSharedValue, translateYSharedValue}: AnimateDragOptions) => {
		const translateXAnimateSharedValueTo = animatedTiming(ANIMATED_TIMING_OPTIONS)({
			sharedValue: translateXSharedValue
		})

		const translateYAnimateSharedValueTo = animatedTiming(ANIMATED_TIMING_OPTIONS)({
			sharedValue: translateYSharedValue
		})

		return () => {
			translateXAnimateSharedValueTo(0)
			translateYAnimateSharedValueTo(0)
		}
	}
