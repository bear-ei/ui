import type {TextInput, TextInputContentSizeChangeEvent} from 'react-native'
import type {Updater} from 'use-immer'
import {COMPONENT_STATUS, EVENT_NAME, type State, STATE} from '../../constants'
import type {AnimatedTimingOptions, AnimateSharedValueTo, StateEvent} from '../../hooks'
import type {
	AnimateTextInputNonErrorStateTimingOptions,
	CreateTextInputDisabledSharedValues,
	CreateTextInputEnabledSharedValues,
	CreateTextInputErrorSharedValues,
	CreateTextInputFocusedSharedValues,
	HandleTextInputStateChangeOptions,
	TextInputState,
	TextInputStateAnimated,
	UpdateTextInputSupportingTextOptions
} from './Text-input.interface'
import {DURATION, EASING} from '../../theme'

export const handleTextInputStateChange =
	({content, eventName, ref, state}: HandleTextInputStateChangeOptions) =>
	(setState: Updater<TextInputState>) =>
	(_event: StateEvent) => {
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
		})

		if (eventName === EVENT_NAME.PRESS_OUT) {
			ref?.current?.focus()
		}
	}

export const createUpdateTextInputContentSize =
	(onContentSizeChange?: (event: TextInputContentSizeChangeEvent) => void) =>
	(setState: Updater<TextInputState>) =>
	(event: TextInputContentSizeChangeEvent) => {
		const contentSize = event.nativeEvent.contentSize

		setState(draft => {
			const isUpdateNextContentSizeChangeEvent =
				(draft.contentSize.height !== contentSize.height || draft.contentSize.width !== contentSize.width) &&
				onContentSizeChange

			if (isUpdateNextContentSizeChangeEvent) {
				draft.nextContentSizeChangeEvent = () => onContentSizeChange?.(event)
			}

			draft.contentSize.height = contentSize.height
			draft.contentSize.width = contentSize.width
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
		setState(draft => {
			if (draft.supportingText !== value && onSupportingTextClose) {
				draft.nextSupportingTextCloseEvent = () => supportingTextDelay && value && onSupportingTextClose()
			}

			draft.supportingText = value
			draft.supportingTextVisible = !!value
		})
	}

export const handleTextInputSupportingTextAnimationFinished =
	(onSupportingTextAnimationFinished?: (visible?: boolean) => void) =>
	(setState: Updater<TextInputState>) =>
	(visible?: boolean) =>
		typeof visible === 'boolean' &&
		setState(draft => {
			const supportingText = visible ? draft.supportingText : undefined

			if (draft.supportingText !== supportingText && onSupportingTextAnimationFinished) {
				draft.nextSupportingTextAnimationFinishedEvent = () => onSupportingTextAnimationFinished?.(visible)
			}

			draft.supportingText = supportingText
		})

export const updateTextInputValueWithCallback =
	(onChangeText?: (value: string) => void) => (setState: Updater<TextInputState>) => (value: string) =>
		setState(draft => {
			if (draft.value !== value && onChangeText) {
				draft.nextChangeTextEvent = () => onChangeText?.(value)
			}

			draft.value = value
		})

export const updateTextInputValue = (setState: Updater<TextInputState>) => (value?: string) =>
	setState(draft => {
		draft.value = value ?? ''

		if (draft.status === COMPONENT_STATUS.IDLE) {
			draft.status = COMPONENT_STATUS.LOADING
		}
	})

export const blurTextInputIfEditable = (ref: React.RefObject<TextInput | null>) => (editable?: boolean) =>
	editable && ref?.current?.blur()

export const focusTextInput = (ref: React.RefObject<TextInput | null>) => () => ref?.current?.focus()
export const createAnimateTextInputEnabledState =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		headerInnerBackgroundColorSharedValue
	}: CreateTextInputEnabledSharedValues) => {
		const animatedTimingOptions = {easing: EASING.STANDARD, duration: DURATION.SHORT_2}
		const activeIndicatorScaleYAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({
			sharedValue: activeIndicatorScaleYSharedValue
		})

		const colorAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({sharedValue: colorSharedValue})
		const headerInnerBackgroundColorAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({
			sharedValue: headerInnerBackgroundColorSharedValue
		})

		return (error?: boolean) => {
			if (error) {
				return
			}

			activeIndicatorScaleYAnimateSharedValueTo(0)
			colorAnimateSharedValueTo(1)
			headerInnerBackgroundColorAnimateSharedValueTo(1)
		}
	}

export const createAnimateTextInputDisabledState =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		headerInnerBackgroundColorSharedValue
	}: CreateTextInputDisabledSharedValues) => {
		const animatedTimingOptions = {easing: EASING.STANDARD, duration: DURATION.SHORT_2}
		const activeIndicatorScaleYAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({
			sharedValue: activeIndicatorScaleYSharedValue
		})

		const colorAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({sharedValue: colorSharedValue})
		const headerInnerBackgroundColorAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({
			sharedValue: headerInnerBackgroundColorSharedValue
		})

		const toValue = 0

		activeIndicatorScaleYAnimateSharedValueTo(toValue)
		colorAnimateSharedValueTo(toValue)
		headerInnerBackgroundColorAnimateSharedValueTo(toValue)
	}

export const createAnimateTextInputErrorState =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		headerInnerBackgroundColorSharedValue
	}: CreateTextInputErrorSharedValues) => {
		const animatedTimingOptions = {easing: EASING.STANDARD, duration: DURATION.SHORT_2}
		const activeIndicatorScaleYAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({
			sharedValue: activeIndicatorScaleYSharedValue
		})

		const colorAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({sharedValue: colorSharedValue})
		const headerInnerBackgroundColorAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({
			sharedValue: headerInnerBackgroundColorSharedValue
		})

		activeIndicatorScaleYAnimateSharedValueTo(1)
		colorAnimateSharedValueTo(3)
		headerInnerBackgroundColorAnimateSharedValueTo(1)
	}

export const createAnimateTextInputFocusedState =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	({
		activeIndicatorScaleYSharedValue,
		colorSharedValue,
		headerInnerBackgroundColorSharedValue
	}: CreateTextInputFocusedSharedValues) => {
		const animatedTimingOptions = {easing: EASING.STANDARD, duration: DURATION.SHORT_2}
		const activeIndicatorScaleYAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({
			sharedValue: activeIndicatorScaleYSharedValue
		})

		const colorAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({sharedValue: colorSharedValue})
		const headerInnerBackgroundColorAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({
			sharedValue: headerInnerBackgroundColorSharedValue
		})

		return (error?: boolean) => {
			if (error) {
				return
			}

			activeIndicatorScaleYAnimateSharedValueTo(1)
			colorAnimateSharedValueTo(2)
			headerInnerBackgroundColorAnimateSharedValueTo(1)
		}
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
