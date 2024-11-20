import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {InteractionManager, NativeSyntheticEvent, TextInput, TextInputContentSizeChangeEventData} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {EventName, State} from '../Common'
import {
        HandleTextFieldStateEventChangeOptions,
        HandleTextFieldSupportingTextOptions,
        TextFieldBaseProps,
        TextFieldState
} from './Text-field.interface'
import {useTextFieldAnimated} from './use-text-field-animated.hook'

const handleTextFieldStateChange = ({content, eventName, ref, state}: HandleTextFieldStateEventChangeOptions) => {
        const nextEvent = {
                pressOut: () => ref?.current?.focus()
        } as Record<EventName, () => void>

        return (setState: Updater<TextFieldState>) => {
                return (_event: StateEvent) => {
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
        }
}

const handleTextFieldContentSizeChange =
        (setState: Updater<TextFieldState>) =>
        (onContentSizeChange?: (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => void) => {
                const handleNextContentSizeChangeEvent =
                        (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => () =>
                                onContentSizeChange?.(event)

                return (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
                        const contentSize = event.nativeEvent.contentSize

                        setState(draft => {
                                draft.contentSize.width = contentSize.width
                                draft.contentSize.height = contentSize.height
                                draft.nextContentSizeChangeEvent = handleNextContentSizeChangeEvent(event)
                        })
                }
        }

const handleTextFieldSupportingText =
        ({timer, supportingTextDelayTime}: HandleTextFieldSupportingTextOptions) =>
        (setState: Updater<TextFieldState>) => {
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

const handleTextFieldSupportingTextVisible =
        (setState: Updater<TextFieldState>) => (onSupportingTextVisible?: (value: boolean) => void) => {
                const handleNextSupportingTextVisible = (value: boolean) => () => onSupportingTextVisible?.(value)

                return (value?: boolean) => {
                        if (typeof value !== 'boolean') {
                                return
                        }

                        setState(draft => {
                                draft.supportingText = value ? draft.supportingText : undefined
                                draft.nextSupportingTextVisible = handleNextSupportingTextVisible(value)
                        })
                }
        }

const handleTextFieldChangeText = (onChangeText?: (value: string) => void) => {
        const handleNextChangeTextEvent = (value: string) => () => onChangeText?.(value)

        return (setState: Updater<TextFieldState>) => (value?: string) => {
                setState(draft => {
                        const prevTextInputValue = draft.textInputValue

                        draft.textInputValue = value ?? ''

                        if (typeof value === 'string' && prevTextInputValue !== value) {
                                draft.nextChangeTextEvent = handleNextChangeTextEvent(value)
                        }
                })
        }
}

const handleTouchableHeaderFocus = (ref: React.RefObject<TextInput>) => () => ref?.current?.focus()

export const TextFieldBase = forwardRef<TextInput, TextFieldBaseProps>(
        (
                {
                        content,
                        defaultValue,
                        disabled,
                        disabledBlur,
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
                        value,
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
                                nextSupportingTextVisible,
                                state,
                                supportingText,
                                supportingTextVisible,
                                textInputValue
                        },
                        setState
                ] = useImmer<TextFieldState>({
                        contentSize: {} as TextInputContentSizeChangeEventData['contentSize'],
                        eventName: undefined,
                        nextChangeTextEvent: undefined,
                        nextContentSizeChangeEvent: undefined,
                        nextPressOutEvent: undefined,
                        nextSupportingTextVisible: undefined,
                        state: 'enabled',
                        supportingText: undefined,
                        supportingTextVisible: undefined,
                        textInputValue: ''
                })

                const id = useId()
                const textFieldRef = useRef<TextInput>(null)
                const supportingTextTimer = useRef<NodeJS.Timeout>()
                const theme = useTheme()
                const placeholderTextColor =
                        state === 'disabled' ?
                                theme.token.palette.convertHexToRGBA(theme.token.scheme.onSurface)(0.38)
                        :       theme.token.scheme.onSurfaceVariant

                const underlayColor = theme.token.scheme.onSurface
                const onTextFieldContentSizeChange = (
                        event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
                ) => handleTextFieldContentSizeChange(setState)(onContentSizeChange)(event)

                const onTextFieldSupportingText = useMemo(
                        () =>
                                handleTextFieldSupportingText({timer: supportingTextTimer, supportingTextDelayTime})(
                                        setState
                                ),
                        [setState, supportingTextDelayTime]
                )

                const onTextFieldChangeText = handleTextFieldChangeText(onChangeText)(setState)
                const onTextFieldChangeTextSource = useMemo(() => handleTextFieldChangeText()(setState), [setState])
                const onTextFieldSupportingTextVisible =
                        handleTextFieldSupportingTextVisible(setState)(onSupportingTextVisible)

                const onTouchableHeaderFocus = handleTouchableHeaderFocus(textFieldRef)
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (changedState: State) => (event: StateEvent) =>
                                handleTextFieldStateChange({
                                        ...options,
                                        content,
                                        ref: textFieldRef,
                                        state: changedState,
                                        disabledBlur
                                })(setState)(event)

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
                } = useTextFieldAnimated({
                        disabled,
                        error,
                        filled: [value, defaultValue, placeholder, textInputValue, content, filled].some(Boolean),
                        state,
                        type
                })

                useImperativeHandle(ref, () => (textFieldRef?.current ? textFieldRef?.current : {}) as TextInput, [])

                useEffect(() => {
                        onTextFieldSupportingText(supportingTextSource)
                }, [onTextFieldSupportingText, supportingTextSource])

                useEffect(() => {
                        onTextFieldChangeTextSource(value ?? defaultValue)
                }, [defaultValue, onTextFieldChangeTextSource, value])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextPressOutEvent?.())
                }, [nextPressOutEvent])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextChangeTextEvent?.())
                }, [nextChangeTextEvent])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextContentSizeChangeEvent?.())
                }, [nextContentSizeChangeEvent])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextSupportingTextVisible?.())
                }, [nextSupportingTextVisible])

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
                        onChangeText: onTextFieldChangeText,
                        onContentSizeChange: onTextFieldContentSizeChange,
                        onHeaderFocus: onTouchableHeaderFocus,
                        onStateEvent,
                        onSupportingTextVisible: onTextFieldSupportingTextVisible,
                        placeholderTextColor,
                        ref: textFieldRef,
                        supportingText,
                        supportingTextAnimatedStyle,
                        supportingTextVisible,
                        trailing,
                        underlayColor,
                        value: textInputValue
                })
        }
)
