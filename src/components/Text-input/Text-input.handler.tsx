import type {TextInput, TextInputContentSizeChangeEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTimingFactory, InteractionEvent} from '../../hooks'
import type {
	AnimateTextInputOptions,
	HandleTextInputInteractionStateChangeOptions,
	TextInputState,
	TextInputInteractionStateAnimations,
	UpdateTextInputSupportingTextOptions
} from './Text-input.interface'

import {COMPONENT_STATUS, EVENT_NAME, INTERACTION_STATE, type InteractionState} from '../../constants'
import {ANIMATED_TIMING} from '../../theme'

export const handleTextInputStateChange = (
	_event: InteractionEvent,
	setState: Updater<TextInputState>,
	{eventName, headerContent, interactionState, ref}: HandleTextInputInteractionStateChangeOptions
) => {
	setState(draft => {
		if (eventName === EVENT_NAME.LAYOUT) {
			if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}

			return
		}

		if ((draft.interactionState === INTERACTION_STATE.FOCUSED && eventName !== EVENT_NAME.BLUR) || headerContent) {
			return
		}

		draft.eventName = eventName

		if (interactionState) {
			draft.interactionState = interactionState
		}
	})

	if (eventName === EVENT_NAME.PRESS_OUT) {
		ref?.current?.focus()
	}
}

export const handleTextInputContentSizeChange =
	(setState: Updater<TextInputState>, onContentSizeChange?: (contentSize: {height: number; width: number}) => void) =>
	(event: TextInputContentSizeChangeEvent) => {
		const contentSize = event.nativeEvent.contentSize

		setState(draft => {
			const isUpdateNextContentSizeChangeEvent =
				(draft.contentSize.height !== contentSize.height || draft.contentSize.width !== contentSize.width) &&
				onContentSizeChange

			if (isUpdateNextContentSizeChangeEvent) {
				draft.pendingContentSizeChangeEvent = event.nativeEvent.contentSize
			}

			draft.contentSize.height = contentSize.height
			draft.contentSize.width = contentSize.width
		})
	}

export const updateTextInputSupportingTextClose = (setState: Updater<TextInputState>) => () =>
	setState(draft => {
		draft.supportingTextVisible = false
	})

// `supportingTextDelay` makes the supporting text auto-hide N ms after
// it appears. Use for transient feedback (e.g. "copied!"). Set to 0 to
// keep the text visible until the parent clears it.
export const updateTextInputSupportingText =
	(
		setState: Updater<TextInputState>,
		{onSupportingTextClose, supportingTextDelay}: UpdateTextInputSupportingTextOptions
	) =>
	(value?: string) => {
		setState(draft => {
			if (draft.supportingText !== value && supportingTextDelay && value && onSupportingTextClose) {
				draft.pendingSupportingTextCloseEvent = true
			}

			draft.supportingText = value
			draft.supportingTextVisible = !!value
		})
	}

export const handleTextInputSupportingTextAnimationFinished =
	(setState: Updater<TextInputState>, onSupportingTextAnimationFinished?: (visible?: boolean) => void) =>
	(visible?: boolean) =>
		typeof visible === 'boolean' &&
		setState(draft => {
			const supportingText = visible ? draft.supportingText : undefined

			if (draft.supportingText !== supportingText && onSupportingTextAnimationFinished) {
				draft.pendingSupportingTextAnimationFinishedEvent = visible
			}

			draft.supportingText = supportingText
		})

export const handleTextInputTextChange =
	(setState: Updater<TextInputState>, onChangeText?: (value: string) => void) => (value: string) =>
		setState(draft => {
			if (draft.value !== value && onChangeText) {
				draft.pendingChangeTextEvent = value
			}

			draft.value = value
		})

export const updateTextInputValue =
	(setState: Updater<TextInputState>) =>
	(value = '') =>
		setState(draft => {
			draft.value = value

			if (draft.status === COMPONENT_STATUS.IDLE) {
				draft.status = COMPONENT_STATUS.LOADING
			}
		})

export const blurTextInputIfEditable = (ref: React.RefObject<TextInput | null>) => (editable?: boolean) =>
	editable && ref.current?.blur()

export const focusTextInput = (ref: React.RefObject<TextInput | null>) => () => ref.current?.focus()
export const animateTextInputEnabledState = (
	[activeIndicatorScaleYSharedValue, colorSharedValue, headerInnerBackgroundColorSharedValue]: [
		SharedValue<number>,
		SharedValue<number>,
		SharedValue<number>
	],
	animatedTiming: AnimatedTimingFactory,
	error?: boolean
) => {
	const activeIndicatorScaleYAnimateSharedValueTo = animatedTiming(
		activeIndicatorScaleYSharedValue,
		ANIMATED_TIMING.STANDARD
	)

	const colorAnimateSharedValueTo = animatedTiming(colorSharedValue, ANIMATED_TIMING.STANDARD)
	const headerInnerBackgroundColorAnimateSharedValueTo = animatedTiming(
		headerInnerBackgroundColorSharedValue,
		ANIMATED_TIMING.STANDARD
	)

	if (error) {
		return
	}

	activeIndicatorScaleYAnimateSharedValueTo(0)
	colorAnimateSharedValueTo(1)
	headerInnerBackgroundColorAnimateSharedValueTo(1)
}

export const animateTextInputDisabledState = (
	[activeIndicatorScaleYSharedValue, colorSharedValue, headerInnerBackgroundColorSharedValue]: [
		SharedValue<number>,
		SharedValue<number>,
		SharedValue<number>
	],
	animatedTiming: AnimatedTimingFactory
) => {
	const activeIndicatorScaleYAnimateSharedValueTo = animatedTiming(
		activeIndicatorScaleYSharedValue,
		ANIMATED_TIMING.STANDARD
	)

	const colorAnimateSharedValueTo = animatedTiming(colorSharedValue, ANIMATED_TIMING.STANDARD)
	const headerInnerBackgroundColorAnimateSharedValueTo = animatedTiming(
		headerInnerBackgroundColorSharedValue,
		ANIMATED_TIMING.STANDARD
	)

	const toValue = 0

	activeIndicatorScaleYAnimateSharedValueTo(toValue)
	colorAnimateSharedValueTo(toValue)
	headerInnerBackgroundColorAnimateSharedValueTo(toValue)
}

export const animateTextInputErrorState = (
	[activeIndicatorScaleYSharedValue, colorSharedValue, headerInnerBackgroundColorSharedValue]: [
		SharedValue<number>,
		SharedValue<number>,
		SharedValue<number>
	],
	animatedTiming: AnimatedTimingFactory
) => {
	const activeIndicatorScaleYAnimateSharedValueTo = animatedTiming(
		activeIndicatorScaleYSharedValue,
		ANIMATED_TIMING.STANDARD
	)

	const colorAnimateSharedValueTo = animatedTiming(colorSharedValue, ANIMATED_TIMING.STANDARD)
	const headerInnerBackgroundColorAnimateSharedValueTo = animatedTiming(
		headerInnerBackgroundColorSharedValue,
		ANIMATED_TIMING.STANDARD
	)

	activeIndicatorScaleYAnimateSharedValueTo(1)
	colorAnimateSharedValueTo(3)
	headerInnerBackgroundColorAnimateSharedValueTo(1)
}

export const animateTextInputFocusedState = (
	[activeIndicatorScaleYSharedValue, colorSharedValue, headerInnerBackgroundColorSharedValue]: [
		SharedValue<number>,
		SharedValue<number>,
		SharedValue<number>
	],
	animatedTiming: AnimatedTimingFactory,
	error?: boolean
) => {
	const activeIndicatorScaleYAnimateSharedValueTo = animatedTiming(
		activeIndicatorScaleYSharedValue,
		ANIMATED_TIMING.STANDARD
	)

	const colorAnimateSharedValueTo = animatedTiming(colorSharedValue, ANIMATED_TIMING.STANDARD)
	const headerInnerBackgroundColorAnimateSharedValueTo = animatedTiming(
		headerInnerBackgroundColorSharedValue,
		ANIMATED_TIMING.STANDARD
	)

	if (error) {
		return
	}

	activeIndicatorScaleYAnimateSharedValueTo(1)
	colorAnimateSharedValueTo(2)
	headerInnerBackgroundColorAnimateSharedValueTo(1)
}

export const animateTextInput =
	(interactionStateAnimations: TextInputInteractionStateAnimations, {disabled, error}: AnimateTextInputOptions) =>
	(interactionState: InteractionState) => {
		if (disabled) {
			interactionStateAnimations[INTERACTION_STATE.DISABLED]?.()

			return
		}

		interactionStateAnimations[error ? INTERACTION_STATE.ERROR : interactionState]?.()
	}
