import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {NativeSyntheticEvent, TextInput, TextInputContentSizeChangeEventData} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hook'
import {EventName, State} from '../Common'
import {HandleTextFieldStateEventChangeOptions, TextFieldBaseProps, TextFieldState} from './Text-field.interface'
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
                state && (draft.state = state)
                prevEventName !== eventName &&
                    eventName === 'pressOut' &&
                    (draft.nextPressOutEvent = nextEvent[eventName])
            })
        }
    }
}

const handleTextFieldContentSizeChange =
    (setState: Updater<TextFieldState>) =>
    (onContentSizeChange?: (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => void) => {
        const createNextContentSizeChangeEvent =
            (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => () =>
                onContentSizeChange?.(event)

        return (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
            const contentSize = event.nativeEvent.contentSize

            setState(draft => {
                draft.contentSize.width = contentSize.width
                draft.contentSize.height = contentSize.height
                draft.nextContentSizeChangeEvent = createNextContentSizeChangeEvent(event)
            })
        }
    }

const handleTextFieldSupportingText = (setState: Updater<TextFieldState>) => (value?: string) =>
    setState(draft => {
        value && (draft.supportingText = value)
        draft.supportingTextVisible = !!value
    })

const handleTextFieldSupportingTextVisible = (setState: Updater<TextFieldState>) => (value?: boolean) =>
    !value &&
    setState(draft => {
        draft.supportingText = undefined
    })

const handleTextFieldChangeText = (onChangeText?: (value: string) => void) => {
    const createNextChangeTextEvent = (value: string) => () => onChangeText?.(value)

    return (setState: Updater<TextFieldState>) => (value?: string) => {
        setState(draft => {
            const prevTextInputValue = draft.textInputValue

            draft.textInputValue = value ?? ''
            typeof value === 'string' &&
                prevTextInputValue !== value &&
                (draft.nextChangeTextEvent = createNextChangeTextEvent(value))
        })
    }
}

export const TextFieldBase = forwardRef<TextInput, TextFieldBaseProps>(
    (
        {
            content,
            defaultValue,
            disabled,
            editable,
            error,
            labelText = 'Label',
            leading,
            multiline,
            onChangeText,
            onContentSizeChange,
            placeholder,
            render,
            supportingText: supportingTextSource,
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
            state: 'enabled',
            supportingText: undefined,
            supportingTextVisible: undefined,
            textInputValue: ''
        })

        const id = useId()
        const textFieldRef = useRef<TextInput>(null)
        const theme = useTheme()
        const placeholderTextColor =
            state === 'disabled' ?
                theme.token.palette.convertHexToRGBA(theme.token.scheme.onSurface)(0.38)
            :   theme.token.scheme.onSurfaceVariant

        const underlayColor = theme.token.scheme.onSurface
        const onTextFieldContentSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) =>
            handleTextFieldContentSizeChange(setState)(onContentSizeChange)(event)

        const onTextFieldSupportingText = handleTextFieldSupportingText(setState)
        const onTextFieldSupportingTextVisible = handleTextFieldSupportingTextVisible(setState)

        const onTextFieldChangeText = handleTextFieldChangeText(onChangeText)(setState)
        const onTextFieldChangeTextSource = useMemo(() => handleTextFieldChangeText()(setState), [setState])
        const onStateEventChange =
            (options: OnStateEventChangeOptions) => (changedState: State) => (event: StateEvent) =>
                handleTextFieldStateChange({...options, content, ref: textFieldRef, state: changedState})(setState)(
                    event
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
        } = useTextFieldAnimated({
            disabled,
            error,
            filled: [value, defaultValue, placeholder, textInputValue, content].some(Boolean),
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
            nextPressOutEvent?.()
        }, [nextPressOutEvent])

        useEffect(() => {
            nextChangeTextEvent?.()
        }, [nextChangeTextEvent])

        useEffect(() => {
            nextContentSizeChangeEvent?.()
        }, [nextContentSizeChangeEvent])

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
