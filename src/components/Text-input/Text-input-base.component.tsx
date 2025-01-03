import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {NativeSyntheticEvent, TextInput, TextInputContentSizeChangeEventData} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {State} from '../Common'
import {
        handleSupportingTextClose,
        handleTextInputChangeText,
        handleTextInputChangeTextInit,
        handleTextInputContentSizeChange,
        handleTextInputEditableChange,
        handleTextInputStateChange,
        handleTextInputSupportingText,
        handleTextInputSupportingTextVisible,
        handleTouchableHeaderFocus
} from './Text-input-handle'
import {TextInputBaseProps, TextInputState} from './Text-input.interface'
import {useTextInputAnimated} from './use-text-input-animated.hook'

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
                        state: 'enabled'
                })

                const value = rawValue ?? defaultValue
                const id = useId()
                const textInputRef = useRef<TextInput>(null)
                const theme = useTheme()
                const placeholderTextColor =
                        state === 'disabled' ?
                                theme.token.palette.convertHexToRGBA(theme.token.scheme.onSurface)(
                                        theme.token.opacity.level5
                                )
                        :       theme.token.scheme.onSurfaceVariant

                const underlayColor = theme.token.scheme.onSurface
                const underlayOpacities = [theme.token.opacity.level0, theme.token.opacity.level1] as [number, number]
                const onTextInputContentSizeChange = (
                        event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
                ) => handleTextInputContentSizeChange(setState)(onContentSizeChange)(event)

                const onSupportingTextClose = useMemo(
                        () => debounce(handleSupportingTextClose(setState))(supportingTextDelayTime ?? 0),
                        [setState, supportingTextDelayTime]
                )

                const onTextInputSupportingText = useMemo(
                        () => handleTextInputSupportingText({supportingTextDelayTime, onSupportingTextClose})(setState),
                        [onSupportingTextClose, setState, supportingTextDelayTime]
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
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (changedState: State) => (event: StateEvent) =>
                                handleTextInputStateChange({
                                        ...options,
                                        content,
                                        ref: textInputRef,
                                        state: changedState
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
                        underlayOpacities,
                        value: textInputValue ?? value
                })
        }
)
