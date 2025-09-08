import type {NativeSyntheticEvent, TextInput, TextInputContentSizeChangeEventData} from 'react-native'
import type {Updater} from 'use-immer'
import type {AnimateSharedValueTo, StateEvent} from '../../hooks'
import {COMPONENT_STATUS, EVENT_NAME, STATE, type EventName, type State} from '../Common'
import type {
	AnimateTextInputNonErrorStateTimingOptions,
	CreateTextInputDisabledSharedValues,
	CreateTextInputEnabledSharedValues,
	CreateTextInputEnabledStateOptions,
	CreateTextInputErrorSharedValues,
	CreateTextInputFocusedSharedValues,
	HandleTextInputStateChangeOptions,
	TextInputState,
	TextInputStateAnimated,
	UpdateTextInputSupportingTextOptions
} from './Text-input.interface'

export const handleTextInputStateChange =
	({content, eventName, ref, state}: HandleTextInputStateChangeOptions) =>
	(setState: Updater<TextInputState>) =>
	(_event: StateEvent) => {
		const nextEvent = {
			[EVENT_NAME.PRESS_OUT]: () => ref?.current?.focus()
		} as Record<EventName, () => void>

		setState(draft => {
			if (eventName === EVENT_NAME.LAYOUT) {
				draft.status = COMPONENT_STATUS.SUCCEEDED

				return
			}

			if ((draft.state === STATE.FOCUSED && eventName !== EVENT_NAME.BLUR) || content) {
				return
			}

			draft.eventName = eventName

			if (state) {
				draft.state = state
			}

			if (eventName === EVENT_NAME.PRESS_OUT) {
				draft.nextPressOutEvent = nextEvent[eventName]
			}
		})
	}

export const createUpdateTextInputContentSize =
	(onContentSizeChange?: (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => void) =>
	(setState: Updater<TextInputState>) =>
	(event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
		const contentSize = event.nativeEvent.contentSize
		const nextContentSizeChangeEvent = () => onContentSizeChange?.(event)

		setState(draft => {
			draft.contentSize.height = contentSize.height
			draft.contentSize.width = contentSize.width
			draft.nextContentSizeChangeEvent = nextContentSizeChangeEvent
		})
	}

export const updateTextInputSupportingTextClose = (setState: Updater<TextInputState>) => () =>
	setState(draft => {
		draft.supportingTextVisible = false
	})

export const updateTextInputSupportingText =
	({onSupportingTextClose, supportingTextDelay}: UpdateTextInputSupportingTextOptions) =>
	(setState: Updater<TextInputState>) =>
	(value?: string) => {
		const nextSupportingTextCloseEvent = () => supportingTextDelay && value && onSupportingTextClose()

		setState(draft => {
			if (draft.supportingText !== value) {
				draft.nextSupportingTextCloseEvent = nextSupportingTextCloseEvent
			}

			draft.supportingText = value
			draft.supportingTextVisible = !!value
		})
	}

export const updateTextInputSupportingTextVisibility =
	(onSupportingTextVisibility?: (visible?: boolean) => void) =>
	(setState: Updater<TextInputState>) =>
	(visible?: boolean) => {
		if (typeof visible !== 'boolean') {
			return
		}

		const nextSupportingTextVisibilityEvent = () => onSupportingTextVisibility?.(visible)

		setState(draft => {
			const supportingText = visible ? draft.supportingText : undefined

			if (draft.supportingText !== supportingText) {
				draft.nextSupportingTextVisibilityEvent = nextSupportingTextVisibilityEvent
			}

			draft.supportingText = supportingText
		})
	}

export const updateTextInputValueWithCallback =
	(onChangeText?: (value: string) => void) => (setState: Updater<TextInputState>) => (value: string) => {
		const nextChangeTextEvent = () => onChangeText?.(value)

		setState(draft => {
			if (draft.value !== value) {
				draft.nextChangeTextEvent = nextChangeTextEvent
			}

			draft.value = value
		})
	}

export const updateTextInputValue = (setState: Updater<TextInputState>) => (value?: string) =>
	setState(draft => {
		draft.value = value ?? ''

		if (draft.status === COMPONENT_STATUS.IDLE) {
			draft.status = COMPONENT_STATUS.LOADING
		}
	})

export const blurTextInputIfEditable = (ref: React.RefObject<TextInput>) => (editable?: boolean) =>
	editable && ref?.current?.blur()

export const focusTextInput = (ref: React.RefObject<TextInput>) => () => ref?.current?.focus()
export const createAnimateTextInputEnabledState =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		inputColorSharedValue,
		labelTextSharedValue,
		supportingTextSharedValue
	}: CreateTextInputEnabledSharedValues) =>
	({filledToValue, error}: CreateTextInputEnabledStateOptions) => {
		const isFilledImmediate = filledToValue === 0

		if (error) {
			return animateSharedValueTo({
				sharedValue: labelTextSharedValue,
				immediate: isFilledImmediate
			})(filledToValue)
		}

		animateSharedValueTo({sharedValue: activeIndicatorScaleYSharedValue})(0)
		animateSharedValueTo({sharedValue: colorSharedValue})(1)
		animateSharedValueTo({sharedValue: inputColorSharedValue})(1)
		animateSharedValueTo({sharedValue: labelTextSharedValue, immediate: isFilledImmediate})(filledToValue)
		animateSharedValueTo({sharedValue: supportingTextSharedValue})(1)
	}

export const createAnimateTextInputDisabledState =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		headerInnerBackgroundColorSharedValue,
		inputColorSharedValue,
		supportingTextSharedValue
	}: CreateTextInputDisabledSharedValues) => {
		const toValue = 0

		animateSharedValueTo({sharedValue: activeIndicatorScaleYSharedValue})(toValue)
		animateSharedValueTo({sharedValue: colorSharedValue})(toValue)
		animateSharedValueTo({sharedValue: headerInnerBackgroundColorSharedValue})(toValue)
		animateSharedValueTo({sharedValue: inputColorSharedValue})(1)
		animateSharedValueTo({sharedValue: supportingTextSharedValue})(1)
	}

export const createAnimateTextInputErrorState =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		inputColorSharedValue,
		supportingTextSharedValue
	}: CreateTextInputErrorSharedValues) => {
		animateSharedValueTo({sharedValue: activeIndicatorScaleYSharedValue})(1)
		animateSharedValueTo({sharedValue: colorSharedValue})(3)
		animateSharedValueTo({sharedValue: inputColorSharedValue})(1)
		animateSharedValueTo({sharedValue: supportingTextSharedValue})(2)
	}

export const createAnimateTextInputFocusedState =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		labelTextSharedValue
	}: CreateTextInputFocusedSharedValues) =>
	(error?: boolean) => {
		if (error) {
			return animateSharedValueTo({sharedValue: labelTextSharedValue})(0)
		}

		animateSharedValueTo({sharedValue: activeIndicatorScaleYSharedValue})(1)
		animateSharedValueTo({sharedValue: colorSharedValue})(2)
		animateSharedValueTo({sharedValue: labelTextSharedValue})(0)
	}

export const animateTextInputStateTiming = (stateAnimated: TextInputStateAnimated) => (state: State) =>
	stateAnimated[state]?.()

export const animateTextInputNonErrorStateTiming = ({error, disabled}: AnimateTextInputNonErrorStateTimingOptions) => {
	const isNonerror = typeof error !== 'boolean' && disabled

	return (stateAnimated: TextInputStateAnimated) => (state: State) =>
		!isNonerror && stateAnimated[error ? STATE.ERROR : state]?.()
}

export const animateTextInputDisabledStateTiming =
	(stateAnimated: TextInputStateAnimated) => (state: State) => (disabled?: boolean) =>
		typeof disabled === 'boolean' && stateAnimated[disabled ? STATE.DISABLED : state]?.()
