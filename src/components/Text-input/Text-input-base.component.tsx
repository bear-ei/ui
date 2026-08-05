import {COMPONENT_STATUS, type ContentSize, type State, STATE} from '@/constants'
import {
    type HandleStateEventChangeOptions,
    type StateEvent,
    useClearComponentEvent,
    useInteractionStateEvent
} from '@/hooks'
import {debounce} from '@/utils'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput} from 'react-native'
import {useImmer} from 'use-immer'
import {TEXT_INPUT_TYPE} from './Text-input.enum'
import {
    blurTextInputIfEditable,
    createUpdateTextInputContentSize,
    focusTextInput,
    handleTextInputStateChange,
    handleTextInputSupportingTextAnimationFinished,
    updateTextInputSupportingText,
    updateTextInputSupportingTextClose,
    updateTextInputValue,
    updateTextInputValueWithCallback
} from './Text-input.handler'
import type {TextInputBaseProps, TextInputState} from './Text-input.interface'
import {RenderTextInput} from './Text-input.render'
import {useTextInputAnimated} from './use-text-input-animated.hook'

export const TextInputBase = forwardRef<TextInput, TextInputBaseProps>(
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
            onChangeText: rawOnChangeText,
            onContentSizeChange: rawOnContentSizeChange,
            onSupportingTextAnimationFinished: rawOnSupportingTextAnimationFinished,
            supportingText: rawSupportingText,
            supportingTextDelay = 0,
            trailing,
            type = TEXT_INPUT_TYPE.FILLED,
            value: rawValue,
            ...renderTextInputProps
        },
        ref
    ) => {
        const [
            {
                contentSize,
                eventName,
                nextChangeTextEvent,
                nextContentSizeChangeEvent,
                nextSupportingTextCloseEvent,
                nextSupportingTextAnimationFinishedEvent,
                state,
                status,
                supportingText,
                supportingTextVisible: isSupportingTextVisible,
                value
            },
            setState
        ] = useImmer<TextInputState>({
            contentSize: {} as ContentSize,
            state: STATE.ENABLED,
            status: COMPONENT_STATUS.IDLE,
            value: ''
        })

        useClearComponentEvent(setState)

        const id = useId()
        const textInputRef = useRef<TextInput>(null)
        const onContentSizeChange = useMemo(
            () => createUpdateTextInputContentSize(rawOnContentSizeChange)(setState),
            [rawOnContentSizeChange, setState]
        )

        const onSupportingTextClose = useMemo(
            () => debounce(updateTextInputSupportingTextClose(setState))(supportingTextDelay),
            [setState, supportingTextDelay]
        )

        const onChangeText = useMemo(
            () => updateTextInputValueWithCallback(rawOnChangeText)(setState),
            [rawOnChangeText, setState]
        )

        const onSupportingTextAnimationFinished = useMemo(
            () => handleTextInputSupportingTextAnimationFinished(rawOnSupportingTextAnimationFinished)(setState),
            [rawOnSupportingTextAnimationFinished, setState]
        )

        const onHeaderFocus = useMemo(() => focusTextInput(textInputRef), [])
        const onStateEventChange = useCallback(
            (options: HandleStateEventChangeOptions) => (changedState: State) => (event: StateEvent) =>
                handleTextInputStateChange({...options, content, ref: textInputRef, state: changedState})(setState)(
                    event
                ),
            [content, setState]
        )

        const interactionHandlers = useInteractionStateEvent({
            ...renderTextInputProps,
            disabled: disabled ?? (typeof editable === 'boolean' ? !editable : undefined),
            onStateEventChange
        })

        const {activeIndicatorAnimatedStyle, headerAnimatedStyle, inputAnimatedStyle} = useTextInputAnimated({
            disabled,
            error,
            state,
            status,
            type
        })

        useImperativeHandle(ref, () => (textInputRef?.current ?? {}) as TextInput, [textInputRef])

        const runUpdateSupportingText = useMemo(
            () => updateTextInputSupportingText({onSupportingTextClose, supportingTextDelay})(setState),
            [onSupportingTextClose, setState, supportingTextDelay]
        )

        const runBlurIfEditable = useMemo(() => blurTextInputIfEditable(textInputRef), [textInputRef])
        const runUpdateValue = useMemo(() => updateTextInputValue(setState), [setState])

        useEffect(() => {
            runBlurIfEditable(editable)
        }, [runBlurIfEditable, editable])

        useEffect(() => {
            runUpdateSupportingText(rawSupportingText)
        }, [runUpdateSupportingText, rawSupportingText])

        useEffect(() => {
            runUpdateValue(rawValue ?? defaultValue)
        }, [runUpdateValue, defaultValue, rawValue])

        useEffect(() => {
            nextChangeTextEvent?.()
        }, [nextChangeTextEvent])

        useEffect(() => {
            nextContentSizeChangeEvent?.()
        }, [nextContentSizeChangeEvent])

        useEffect(() => {
            nextSupportingTextAnimationFinishedEvent?.()
        }, [nextSupportingTextAnimationFinishedEvent])

        useEffect(() => {
            nextSupportingTextCloseEvent?.()
        }, [nextSupportingTextCloseEvent])

        return (
            <RenderTextInput
                {...renderTextInputProps}
                activeIndicatorAnimatedStyle={activeIndicatorAnimatedStyle}
                content={content}
                contentSize={contentSize}
                disabled={disabled}
                editable={editable}
                error={error}
                eventName={eventName}
                headerAnimatedStyle={headerAnimatedStyle}
                id={id}
                inputAnimatedStyle={inputAnimatedStyle}
                interactionHandlers={interactionHandlers}
                labelText={labelText}
                leadingElement={leading}
                multiline={multiline}
                onChangeText={onChangeText}
                onContentSizeChange={onContentSizeChange}
                onHeaderFocus={onHeaderFocus}
                onSupportingTextAnimationFinished={onSupportingTextAnimationFinished}
                ref={textInputRef}
                supportingText={supportingText}
                supportingTextVisible={isSupportingTextVisible}
                trailingElement={trailing}
                value={value}
            />
        )
    }
)

TextInputBase.displayName = 'TextInputBase'
