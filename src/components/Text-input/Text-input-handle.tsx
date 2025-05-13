import type {NativeSyntheticEvent, TextInput, TextInputContentSizeChangeEventData} from 'react-native'
import type {Updater} from 'use-immer'
import type {AnimatedTiming, StateEvent} from '../../hooks'
import {COMPONENT_STATUS, EVENT_NAME, STATE, type EventName, type State} from '../Common'
import type {
	HandleTextInputDisabledSharedValue,
	HandleTextInputEnabledSharedOptions,
	HandleTextInputEnabledSharedValue,
	HandleTextInputErrorSharedValue,
	HandleTextInputFocusedSharedValue,
	HandleTextInputNonerrorAnimatedTimingOptions,
	HandleTextInputStateEventChangeOptions,
	HandleTextInputSupportingTextOptions,
	TextInputState,
	TextInputStateAnimated
} from './Text-input.interface'

export const handleTextInputStateChange =
	({content, eventName, ref, state}: HandleTextInputStateEventChangeOptions) =>
	(setState: Updater<TextInputState>) =>
	(_event: StateEvent) => {
		const nextEvent = {
			[EVENT_NAME.PRESS_OUT]: () => ref?.current?.focus()
		} as Record<EventName, () => void>

		if (eventName === EVENT_NAME.LAYOUT) {
			return
		}

		setState(draft => {
			if ((draft.state === STATE.FOCUSED && eventName !== EVENT_NAME.BLUR) || content) {
				return
			}

			const prevEventName = draft.eventName

			draft.eventName = eventName

			if (state) {
				draft.state = state
			}

			if (prevEventName !== eventName && eventName === EVENT_NAME.PRESS_OUT) {
				draft.nextPressOutEvent = nextEvent[eventName]
			}
		})
	}

export const handleTextInputContentSizeChange =
	(onContentSizeChange?: (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => void) =>
	(setState: Updater<TextInputState>) =>
	(event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
		const handleNextContentSizeChangeEvent = () => onContentSizeChange?.(event)
		const contentSize = event.nativeEvent.contentSize

		setState(draft => {
			draft.contentSize.height = contentSize.height
			draft.contentSize.width = contentSize.width
			draft.nextContentSizeChangeEvent = handleNextContentSizeChangeEvent
		})
	}

export const handleTextInputSupportingTextClose = (setState: Updater<TextInputState>) => () =>
	setState(draft => {
		draft.supportingTextVisible = false
	})

export const handleTextInputSupportingText =
	({onTextInputSupportingTextClose, supportingTextDelay}: HandleTextInputSupportingTextOptions) =>
	(setState: Updater<TextInputState>) =>
	(value?: string) => {
		setState(draft => {
			if (value === draft.supportingText) {
				return
			}

			draft.supportingText = value
			draft.supportingTextVisible = !!value
		})

		if (supportingTextDelay && value) {
			onTextInputSupportingTextClose()
		}
	}

export const handleTextInputSupportingTextVisible =
	(onSupportingTextVisible?: (visible?: boolean) => void) =>
	(setState: Updater<TextInputState>) =>
	(visible?: boolean) => {
		const handleNextSupportingTextVisibleEvent = () => onSupportingTextVisible?.(visible)

		if (typeof visible !== 'boolean') {
			return
		}

		setState(draft => {
			draft.nextSupportingTextVisibleEvent = handleNextSupportingTextVisibleEvent
			draft.supportingText = visible ? draft.supportingText : undefined
		})
	}

export const handleTextInputChangeText =
	(onChangeText?: (value: string) => void) => (setState: Updater<TextInputState>) => (value?: string) => {
		const nextValue = value?.trim()
		const createNextChangeTextEvent = () => typeof nextValue === 'string' && onChangeText?.(nextValue)

		setState(draft => {
			if (nextValue === draft.value) {
				return
			}

			draft.nextChangeTextEvent = createNextChangeTextEvent
			draft.value = nextValue ?? ''
		})
	}

export const handleTextInputRawChangeText = (setState: Updater<TextInputState>) => (value?: string) =>
	setState(draft => {
		if (value !== draft.value) {
			draft.value = value ?? ''
		}

		if (draft.status === COMPONENT_STATUS.IDLE) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})

export const handleTextInputEditableChange = (ref: React.RefObject<TextInput>) => (editable?: boolean) =>
	editable && ref?.current?.blur()

export const handleTouchableHeaderFocus = (ref: React.RefObject<TextInput>) => () => ref?.current?.focus()
export const handleTextInputEnabled =
	(animatedTiming: AnimatedTiming) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		inputColorSharedValue,
		labelTextSharedValue,
		supportingTextSharedValue
	}: HandleTextInputEnabledSharedValue) =>
	({filledToValue, error}: HandleTextInputEnabledSharedOptions) => {
		if (error) {
			return animatedTiming()(labelTextSharedValue)(filledToValue)
		}

		animatedTiming()(activeIndicatorScaleYSharedValue)(0)
		animatedTiming()(colorSharedValue)(1)
		animatedTiming()(inputColorSharedValue)(1)
		animatedTiming()(labelTextSharedValue)(filledToValue)
		animatedTiming()(supportingTextSharedValue)(1)
	}

export const handleTextInputDisabled =
	(animatedTiming: AnimatedTiming) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		headerInnerBackgroundColorSharedValue,
		inputColorSharedValue,
		supportingTextSharedValue
	}: HandleTextInputDisabledSharedValue) => {
		const toValue = 0

		animatedTiming()(activeIndicatorScaleYSharedValue)(toValue)
		animatedTiming()(colorSharedValue)(toValue)
		animatedTiming()(headerInnerBackgroundColorSharedValue)(toValue)
		animatedTiming()(inputColorSharedValue)(1)
		animatedTiming()(supportingTextSharedValue)(1)
	}

export const handleTextInputError =
	(animatedTiming: AnimatedTiming) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		inputColorSharedValue,
		supportingTextSharedValue
	}: HandleTextInputErrorSharedValue) => {
		animatedTiming()(activeIndicatorScaleYSharedValue)(1)
		animatedTiming()(colorSharedValue)(3)
		animatedTiming()(inputColorSharedValue)(1)
		animatedTiming()(supportingTextSharedValue)(2)
	}

export const handleTextInputFocused =
	(animatedTiming: AnimatedTiming) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		labelTextSharedValue
	}: HandleTextInputFocusedSharedValue) =>
	(error?: boolean) => {
		if (error) {
			return animatedTiming()(labelTextSharedValue)(0)
		}

		animatedTiming()(activeIndicatorScaleYSharedValue)(1)
		animatedTiming()(colorSharedValue)(2)
		animatedTiming()(labelTextSharedValue)(0)
	}

export const handleTextInputStateAnimatedTiming = (stateAnimated: TextInputStateAnimated) => (state: State) =>
	stateAnimated[state]?.()

export const handleTextInputNonerrorAnimatedTiming = ({
	error,
	disabled
}: HandleTextInputNonerrorAnimatedTimingOptions) => {
	const isNonerror = typeof error !== 'boolean' && disabled

	return (stateAnimated: TextInputStateAnimated) => (state: State) =>
		!isNonerror && stateAnimated[error ? STATE.ERROR : state]?.()
}

export const handleTextInputDisabledAnimatedTiming =
	(stateAnimated: TextInputStateAnimated) => (state: State) => (disabled?: boolean) =>
		typeof disabled === 'boolean' && stateAnimated[disabled ? STATE.DISABLED : state]?.()
