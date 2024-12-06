import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {NativeSyntheticEvent, TextInput, TextInputContentSizeChangeEventData} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {EventName, State} from '../Common'
import {
        HandleTextInputStateEventChangeOptions,
        HandleTextInputSupportingTextOptions,
        TextInputBaseProps,
        TextInputState
} from './Text-input.interface'
import {useTextInputAnimated} from './use-text-input-animated.hook'

const handleTextInputStateChange =
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

const handleTextInputContentSizeChange =
        (setState: Updater<TextInputState>) =>
        (onContentSizeChange?: (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => void) =>
        (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
                const handleNextContentSizeChangeEvent = () => onContentSizeChange?.(event)
                const contentSize = event.nativeEvent.contentSize

                setState(draft => {
                        draft.contentSize.width = contentSize.width
                        draft.contentSize.height = contentSize.height
                        draft.nextContentSizeChangeEvent = handleNextContentSizeChangeEvent
                })
        }

const handleTextInputSupportingText =
        ({timer, supportingTextDelayTime}: HandleTextInputSupportingTextOptions) =>
        (setState: Updater<TextInputState>) => {
                const handleSupportingTextVisible = () =>
                        setState(draft => {
                                draft.supportingTextVisible = false
                        })

                return (value?: string) => {
                        clearTimeout(timer.current)
                        setState(draft => {
                                if (value) {
                                        draft.supportingText = value
                                }

                                draft.supportingTextVisible = !!value
                        })

                        if (supportingTextDelayTime && value) {
                                timer.current = setTimeout(handleSupportingTextVisible, supportingTextDelayTime)
                        }
                }
        }

const handleTextInputSupportingTextVisible =
        (setState: Updater<TextInputState>) =>
        (onSupportingTextVisible?: (value: boolean) => void) =>
        (value?: boolean) => {
                const handleNextSupportingTextVisibleEvent = () => {
                        if (value) {
                                onSupportingTextVisible?.(value)
                        }
                }

                if (typeof value !== 'boolean') {
                        return
                }

                setState(draft => {
                        draft.supportingText = value ? draft.supportingText : undefined
                        draft.nextSupportingTextVisibleEvent = handleNextSupportingTextVisibleEvent
                })
        }

const handleTextInputChangeText =
        (onChangeText?: (value: string) => void) => (setState: Updater<TextInputState>) => (value?: string) => {
                const nextValue = value?.trim()
                const handleNextChangeTextEvent = () => {
                        if (nextValue) {
                                onChangeText?.(nextValue)
                        }
                }

                setState(draft => {
                        const prevTextInputValue = draft.textInputValue

                        draft.textInputValue = nextValue ?? ''

                        if (typeof nextValue === 'string' && prevTextInputValue !== nextValue) {
                                draft.nextChangeTextEvent = handleNextChangeTextEvent
                        }
                })
        }

const handleTextInputChangeTextInit = (setState: Updater<TextInputState>) => (value?: string) =>
        setState(draft => {
                draft.textInputValue = value
        })

const handleTextInputEditableChange = (ref: React.RefObject<TextInput>) => (value?: boolean) => {
        if (value) {
                ref?.current?.blur()
        }
}

const handleTouchableHeaderFocus = (ref: React.RefObject<TextInput>) => () => ref?.current?.focus()

export const TextInputBase = forwardRef<TextInput, TextInputBaseProps>(
        (
                {
                        content,
                        defaultValue,
                        disabled,
                        editable,
                        error,
                        filled,
                        labelText = 'Label',
                        leading,
                        multiline,
                        onChangeText,
                        onContentSizeChange,
                        onSupportingTextVisible,
                        placeholder,
                        render,
                        supportingText: supportingTextSource,
                        supportingTextDelayTime,
                        trailing,
                        type = 'filled',
                        value: rawValue,
                        ...renderProps
                },
                ref
        ) => {
                const [
                        {
                                contentSize,
                                eventName,
                                nextChangeTextEvent,
                                nextContentSizeChangeEvent,
                                nextPressOutEvent,
                                nextSupportingTextVisibleEvent,
                                state,
                                supportingText,
                                supportingTextVisible,
                                textInputValue
                        },
                        setState
                ] = useImmer<TextInputState>({
                        contentSize: {} as TextInputContentSizeChangeEventData['contentSize'],
                        eventName: undefined,
                        nextChangeTextEvent: undefined,
                        nextContentSizeChangeEvent: undefined,
                        nextPressOutEvent: undefined,
                        nextSupportingTextVisibleEvent: undefined,
                        state: 'enabled',
                        supportingText: undefined,
                        supportingTextVisible: undefined,
                        textInputValue: undefined
                })

                const value = rawValue ?? defaultValue
                const id = useId()
                const textInputRef = useRef<TextInput>(null)
                const supportingTextTimer = useRef<NodeJS.Timeout>()
                const theme = useTheme()
                const placeholderTextColor =
                        state === 'disabled' ?
                                theme.token.palette.convertHexToRGBA(theme.token.scheme.onSurface)(0.38)
                        :       theme.token.scheme.onSurfaceVariant

                const underlayColor = theme.token.scheme.onSurface
                const onTextInputContentSizeChange = (
                        event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
                ) => handleTextInputContentSizeChange(setState)(onContentSizeChange)(event)

                const onTextInputSupportingText = useMemo(
                        () =>
                                handleTextInputSupportingText({timer: supportingTextTimer, supportingTextDelayTime})(
                                        setState
                                ),
                        [setState, supportingTextDelayTime]
                )

                const onTextInputEditableChange = useMemo(
                        () => handleTextInputEditableChange(textInputRef),
                        [textInputRef]
                )

                const onTextInputChangeText = handleTextInputChangeText(onChangeText)(setState)
                const onTextInputChangeTextInit = useMemo(() => handleTextInputChangeTextInit(setState), [setState])
                const onTextInputSupportingTextVisible =
                        handleTextInputSupportingTextVisible(setState)(onSupportingTextVisible)

                const onTouchableHeaderFocus = handleTouchableHeaderFocus(textInputRef)
                const onStateEventChange = useCallback(
                        (options: OnStateEventChangeOptions) => (changedState: State) => (event: StateEvent) =>
                                handleTextInputStateChange({
                                        ...options,
                                        content,
                                        ref: textInputRef,
                                        state: changedState
                                })(setState)(event),
                        [content, setState]
                )

                const onStateEvent = useOnStateEvent({
                        ...renderProps,
                        disabled: disabled ?? (typeof editable === 'boolean' ? !editable : undefined),
                        onStateEventChange
                })

                const {
                        activeIndicatorAnimatedStyle,
                        headerAnimatedStyle,
                        inputAnimatedStyle,
                        labelAnimatedStyle,
                        labelTextAnimatedStyle,
                        supportingTextAnimatedStyle
                } = useTextInputAnimated({
                        disabled,
                        error,
                        filled: [value, placeholder, textInputValue, content, filled].some(Boolean),
                        state,
                        type
                })

                useImperativeHandle(ref, () => (textInputRef?.current ? textInputRef?.current : {}) as TextInput, [])

                useEffect(() => {
                        onTextInputEditableChange(editable)
                }, [editable, onTextInputEditableChange])

                useEffect(() => {
                        onTextInputSupportingText(supportingTextSource)
                }, [onTextInputSupportingText, supportingTextSource])

                useEffect(() => {
                        onTextInputChangeTextInit(rawValue ?? defaultValue)
                }, [defaultValue, onTextInputChangeTextInit, rawValue])

                useEffect(() => {
                        nextPressOutEvent?.()
                }, [nextPressOutEvent])

                useEffect(() => {
                        nextChangeTextEvent?.()
                }, [nextChangeTextEvent])

                useEffect(() => {
                        nextContentSizeChangeEvent?.()
                }, [nextContentSizeChangeEvent])

                useEffect(() => {
                        nextSupportingTextVisibleEvent?.()
                }, [nextSupportingTextVisibleEvent])

                return render({
                        ...renderProps,
                        activeIndicatorAnimatedStyle,
                        content,
                        contentSize,
                        editable,
                        eventName,
                        headerAnimatedStyle,
                        id,
                        inputAnimatedStyle,
                        labelAnimatedStyle,
                        labelText,
                        labelTextAnimatedStyle,
                        leading,
                        multiline,
                        onChangeText: onTextInputChangeText,
                        onContentSizeChange: onTextInputContentSizeChange,
                        onHeaderFocus: onTouchableHeaderFocus,
                        onStateEvent,
                        onSupportingTextVisible: onTextInputSupportingTextVisible,
                        placeholderTextColor,
                        ref: textInputRef,
                        supportingText,
                        supportingTextAnimatedStyle,
                        supportingTextVisible,
                        trailing,
                        underlayColor,
                        value: textInputValue ?? value
                })
        }
)
