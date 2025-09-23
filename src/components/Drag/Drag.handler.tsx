import type {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import {runOnJS} from 'react-native-reanimated'
import type {AnimateSharedValueTo} from '../../hooks'
import type {
	AnimateDragOptions,
	UpdatePrevTranslationSharedValueOptions,
	UpdateTranslationOptions,
	UpdateTranslationScreenOptions,
	UpdateTranslationSharedValueOptions
} from './Drag.interface'

export const updatePrevTranslation =
	({
		prevTranslationXSharedValue,
		prevTranslationYSharedValue,
		onStart
	}: UpdatePrevTranslationSharedValueOptions) =>
	({translateXSharedValue, translateYSharedValue}: UpdateTranslationSharedValueOptions) =>
	(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
		'worklet'

		prevTranslationXSharedValue.value = translateXSharedValue.value
		prevTranslationYSharedValue.value = translateYSharedValue.value

		if (onStart) {
			runOnJS(onStart)(event)
		}
	}

export const updateTranslation = ({width, height, theme, onUpdate}: UpdateTranslationScreenOptions) => {
	const clamp = (min: number) => (max: number) => (value: number) => Math.min(Math.max(value, min), max)
	const maxTranslateX = width / 2 - theme.adaptSize(theme.token.spacing.large)
	const maxTranslateY = height / 2 - theme.adaptSize(theme.token.spacing.large)

	return ({
			prevTranslationXSharedValue,
			prevTranslationYSharedValue,
			translateXSharedValue,
			translateYSharedValue
		}: UpdateTranslationOptions) =>
		(event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
			'worklet'

			translateXSharedValue.value = clamp(-maxTranslateX)(maxTranslateX)(
				prevTranslationXSharedValue.value + event.translationX
			)

			translateYSharedValue.value = clamp(-maxTranslateY)(maxTranslateY)(
				prevTranslationYSharedValue.value + event.translationY
			)

			if (onUpdate) {
				runOnJS(onUpdate)(event)
			}
		}
}

export const handlePanGestureEnd =
	(onEnd?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void) =>
	(runAnimate: () => void) =>
	(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
		'worklet'

		runAnimate()

		if (onEnd) {
			runOnJS(onEnd)(event)
		}
	}

export const animateDrag =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	({translateXSharedValue, translateYSharedValue}: AnimateDragOptions) =>
	() => {
		animateSharedValueTo({sharedValue: translateXSharedValue})(0)
		animateSharedValueTo({sharedValue: translateYSharedValue})(0)
	}
