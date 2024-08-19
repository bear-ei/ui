import {RefObject, forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {NativeSyntheticEvent, TextInput, TextInputContentSizeChangeEventData} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hook'
import {EventName, State} from '../Common'
import {HandleTextFieldStateEventChangeOptions, InitialTextFieldState, TextFieldBaseProps} from './Text-field.interface'
import {useTextFieldAnimated} from './use-text-field-animated.hook'

const handleTextFieldFocus = (ref?: RefObject<TextInput>) => ref?.current?.focus()
const handleTextFieldStateChange =
    ({eventName, ref, content, state}: HandleTextFieldStateEventChangeOptions) =>
    (setState: Updater<InitialTextFieldState>) =>
    (_event: StateEvent) => {
        if (eventName === 'layout') {
            return
        }

        const nextEvent = {
            pressOut: () => handleTextFieldFocus(ref)
        } as Record<EventName, () => void>

        setState(draft => {
            if ((draft.state === 'focused' && eventName !== 'blur') || content) {
                return
            }

            const prevEventName = draft.eventName

            draft.eventName = eventName
            state && (draft.state = state)
            prevEventName !== eventName && eventName === 'pressOut' && (draft.nextPressOutEvent = nextEvent[eventName])
        })
    }

const createNextContentSizeChangeCallback =
    (onContentSizeChange?: (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => void) =>
    (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) =>
    () =>
        onContentSizeChange?.(event)

const handleTextFieldContentSizeChange =
    (setState: Updater<InitialTextFieldState>) =>
    (onContentSizeChange?: (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => void) =>
    (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
        const contentSize = event.nativeEvent.contentSize

        setState(draft => {
            draft.contentSize.width = contentSize.width
            draft.contentSize.height = contentSize.height
            draft.nextContentSizeChangeCallback = createNextContentSizeChangeCallback(onContentSizeChange)(event)
        })
    }

const createNextChangeTextCallback = (onChangeText?: (value: string) => void) => (value: string) => () =>
    onChangeText?.(value)

const handleTextFieldChangeText =
    (onChangeText?: (value: string) => void) => (setState: Updater<InitialTextFieldState>) => (value?: string) => {
        setState(draft => {
            const prevTextInputValue = draft.textInputValue

            draft.textInputValue = value
            typeof value === 'string' &&
                prevTextInputValue !== value &&
                (draft.nextChangeTextCallback = createNextChangeTextCallback(onChangeText)(value))
        })
    }

const handleTextFieldEditable = (setState: Updater<InitialTextFieldState>) => (editable?: boolean) => {
    typeof editable === 'boolean' &&
        !editable &&
        setState(draft => {
            draft.eventName = 'blur'
            draft.state = 'enabled'
        })
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
            supportingText,
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
                nextChangeTextCallback,
                nextContentSizeChangeCallback,
                nextPressOutEvent,
                state,
                textInputValue
            },
            setState
        ] = useImmer<InitialTextFieldState>({
            contentSize: {} as TextInputContentSizeChangeEventData['contentSize'],
            eventName: undefined,
            nextChangeTextCallback: undefined,
            nextContentSizeChangeCallback: undefined,
            nextPressOutEvent: undefined,
            state: 'enabled',
            textInputValue: undefined
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

        const onTextFieldChangeText = handleTextFieldChangeText(onChangeText)(setState)
        const onTextFieldChangeTextSource = useMemo(() => handleTextFieldChangeText()(setState), [setState])
        const onTextFieldEditable = useMemo(() => handleTextFieldEditable(setState), [setState])
        const onStateEventChange =
            (options: OnStateEventChangeOptions) => (changedState: State) => (event: StateEvent) =>
                handleTextFieldStateChange({...options, ref: textFieldRef, content, state: changedState})(setState)(
                    event
                )

        const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})
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
            onTextFieldChangeTextSource(value ?? defaultValue)
        }, [defaultValue, onTextFieldChangeTextSource, value])

        useEffect(() => {
            onTextFieldEditable(editable)
        }, [editable, onTextFieldEditable])

        useEffect(() => {
            nextPressOutEvent?.()
        }, [nextPressOutEvent])

        useEffect(() => {
            nextChangeTextCallback?.()
        }, [nextChangeTextCallback])

        useEffect(() => {
            nextContentSizeChangeCallback?.()
        }, [nextContentSizeChangeCallback])

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
            placeholderTextColor,
            ref: textFieldRef,
            supportingText,
            supportingTextAnimatedStyle,
            trailing,
            underlayColor,
            value: textInputValue
        })
    }
)
