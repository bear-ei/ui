import type {NativeSyntheticEvent, TextInput, TextInputContentSizeChangeEventData} from 'react-native'
import type {Updater} from 'use-immer'
import type {CreateSharedValueAnimator, StateEvent} from '../../hooks'
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
		if (eventName === EVENT_NAME.LAYOUT) {
			return
		}

		const nextEvent = {
			[EVENT_NAME.PRESS_OUT]: () => ref?.current?.focus()
		} as Record<EventName, () => void>

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
	({onTextInputSupportingTextClose, supportingTextDelay}: UpdateTextInputSupportingTextOptions) =>
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

export const updateTextInputSupportingTextVisibility =
	(onSupportingTextVisible?: (visible?: boolean) => void) =>
	(setState: Updater<TextInputState>) =>
	(visible?: boolean) => {
		if (typeof visible !== 'boolean') {
			return
		}

		const nextSupportingTextVisibilityEvent = () => onSupportingTextVisible?.(visible)

		setState(draft => {
			draft.nextSupportingTextVisibilityEvent = nextSupportingTextVisibilityEvent
			draft.supportingText = visible ? draft.supportingText : undefined
		})
	}

export const updateTextInputValueWithCallback =
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

export const updateTextInputValue = (setState: Updater<TextInputState>) => (value?: string) =>
	setState(draft => {
		if (value !== draft.value) {
			draft.value = value ?? ''
		}

		if (draft.status === COMPONENT_STATUS.IDLE) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})

export const blurTextInputIfEditable = (ref: React.RefObject<TextInput>) => (editable?: boolean) =>
	editable && ref?.current?.blur()

export const focusTextInput = (ref: React.RefObject<TextInput>) => () => ref?.current?.focus()
export const createAnimateTextInputEnabledState =
	(createSharedValueAnimator: CreateSharedValueAnimator) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		inputColorSharedValue,
		labelTextSharedValue,
		supportingTextSharedValue
	}: CreateTextInputEnabledSharedValues) =>
	({filledToValue, error}: CreateTextInputEnabledStateOptions) => {
		if (error) {
			return createSharedValueAnimator(labelTextSharedValue)(filledToValue)
		}

		createSharedValueAnimator(activeIndicatorScaleYSharedValue)(0)
		createSharedValueAnimator(colorSharedValue)(1)
		createSharedValueAnimator(inputColorSharedValue)(1)
		createSharedValueAnimator(labelTextSharedValue)(filledToValue)
		createSharedValueAnimator(supportingTextSharedValue)(1)
	}

export const createAnimateTextInputDisabledState =
	(createSharedValueAnimator: CreateSharedValueAnimator) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		headerInnerBackgroundColorSharedValue,
		inputColorSharedValue,
		supportingTextSharedValue
	}: CreateTextInputDisabledSharedValues) => {
		const toValue = 0

		createSharedValueAnimator(activeIndicatorScaleYSharedValue)(toValue)
		createSharedValueAnimator(colorSharedValue)(toValue)
		createSharedValueAnimator(headerInnerBackgroundColorSharedValue)(toValue)
		createSharedValueAnimator(inputColorSharedValue)(1)
		createSharedValueAnimator(supportingTextSharedValue)(1)
	}

export const createAnimateTextInputErrorState =
	(createSharedValueAnimator: CreateSharedValueAnimator) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		inputColorSharedValue,
		supportingTextSharedValue
	}: CreateTextInputErrorSharedValues) => {
		createSharedValueAnimator(activeIndicatorScaleYSharedValue)(1)
		createSharedValueAnimator(colorSharedValue)(3)
		createSharedValueAnimator(inputColorSharedValue)(1)
		createSharedValueAnimator(supportingTextSharedValue)(2)
	}

export const createAnimateTextInputFocusedState =
	(createSharedValueAnimator: CreateSharedValueAnimator) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		labelTextSharedValue
	}: CreateTextInputFocusedSharedValues) =>
	(error?: boolean) => {
		if (error) {
			return createSharedValueAnimator(labelTextSharedValue)(0)
		}

		createSharedValueAnimator(activeIndicatorScaleYSharedValue)(1)
		createSharedValueAnimator(colorSharedValue)(2)
		createSharedValueAnimator(labelTextSharedValue)(0)
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
