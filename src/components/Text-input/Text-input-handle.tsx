import {NativeSyntheticEvent, TextInput, TextInputContentSizeChangeEventData} from 'react-native'
import {Updater} from 'use-immer'
import {AnimatedTiming, StateEvent} from '../../hooks'
import {EventName, State} from '../Common'
import {
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
                        pressOut: () => ref?.current?.focus()
                } as Record<EventName, () => void>

                if (eventName === 'layout') {
                        return
                }

                setState(draft => {
                        if ((draft.state === 'focused' && eventName !== 'blur') || content) {
                                return
                        }

                        const prevEventName = draft.eventName

                        draft.eventName = eventName

                        if (state) {
                                draft.state = state
                        }

                        if (prevEventName !== eventName && eventName === 'pressOut') {
                                draft.nextPressOutEvent = nextEvent[eventName]
                        }
                })
        }

export const handleTextInputContentSizeChange =
        (setState: Updater<TextInputState>) =>
        (onContentSizeChange?: (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => void) =>
        (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
                const handleNextContentSizeChangeEvent = () => onContentSizeChange?.(event)
                const contentSize = event.nativeEvent.contentSize

                setState(draft => {
                        draft.contentSize.height = contentSize.height
                        draft.contentSize.width = contentSize.width
                        draft.nextContentSizeChangeEvent = handleNextContentSizeChangeEvent
                })
        }

export const handleSupportingTextClose = (setState: Updater<TextInputState>) => () =>
        setState(draft => {
                draft.supportingTextVisible = false
        })

export const handleTextInputSupportingText =
        ({onSupportingTextClose, supportingTextDelayTime}: HandleTextInputSupportingTextOptions) =>
        (setState: Updater<TextInputState>) =>
        (value?: string) => {
                setState(draft => {
                        if (value === draft.supportingText) {
                                return
                        }

                        draft.supportingText = value
                        draft.supportingTextVisible = !!value
                })

                if (supportingTextDelayTime && value) {
                        onSupportingTextClose()
                }
        }

export const handleTextInputSupportingTextVisible =
        (setState: Updater<TextInputState>) =>
        (onSupportingTextVisible?: (value?: boolean) => void) =>
        (value?: boolean) => {
                const handleNextSupportingTextVisibleEvent = () => onSupportingTextVisible?.(value)

                if (typeof value !== 'boolean') {
                        return
                }

                setState(draft => {
                        draft.nextSupportingTextVisibleEvent = handleNextSupportingTextVisibleEvent
                        draft.supportingText = value ? draft.supportingText : undefined
                })
        }

export const handleTextInputChangeText =
        (onChangeText?: (value: string) => void) => (setState: Updater<TextInputState>) => (value?: string) => {
                const nextValue = value?.trim()
                const handleNextChangeTextEvent = () => typeof nextValue === 'string' && onChangeText?.(nextValue)

                setState(draft => {
                        if (nextValue === draft.value) {
                                return
                        }

                        draft.nextChangeTextEvent = handleNextChangeTextEvent
                        draft.value = nextValue ?? ''
                })
        }

export const handleTextInputRawChangeText = (setState: Updater<TextInputState>) => (value?: string) =>
        setState(draft => {
                if (value !== draft.value) {
                        draft.value = value ?? ''
                }

                if (draft.status === 'idle') {
                        draft.status = 'succeeded'
                }
        })

export const handleTextInputEditableChange = (ref: React.RefObject<TextInput>) => (value?: boolean) =>
        value && ref?.current?.blur()

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
        const nonerror = typeof error !== 'boolean' && disabled

        return (stateAnimated: TextInputStateAnimated) => (state: State) =>
                !nonerror && stateAnimated[error ? 'error' : state]?.()
}

export const handleTextInputDisabledAnimatedTiming =
        (stateAnimated: TextInputStateAnimated) => (state: State) => (disabled?: boolean) =>
                typeof disabled === 'boolean' && stateAnimated[disabled ? 'disabled' : state]?.()
