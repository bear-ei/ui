import {hexToRGBA} from '@bearei/material-token'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput, TextInputContentSizeChangeEventData} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useStateEvent} from '../../hooks'
import {createStableHandler, createStableHandlerWithState, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, STATE, type State} from '../Common'

import {TEXT_INPUT_TYPE} from './Text-input.enum'
import {
	handleTextInputContentSizeChange,
	handleTextInputEditableChange,
	handleTextInputFocusFromHeader,
	handleTextInputStateChange,
	updateTextInputSupportingText,
	updateTextInputSupportingTextClose,
	updateTextInputSupportingTextVisibility,
	updateTextInputValue,
	updateTextInputValueWithCallback
} from './Text-input.handle'
import type {TextInputBaseProps, TextInputState} from './Text-input.interface'
import {useTextInputAnimated} from './use-text-input-animated.hook'

export const TextInputBase = forwardRef<TextInput, TextInputBaseProps>(
	(
		{
			content,
			defaultValue,
			density,
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
			renderTextInput,
			supportingText: rawSupportingText,
			supportingTextDelay,
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
				nextPressOutEvent,
				nextSupportingTextVisibleEvent,
				state,
				status,
				supportingText,
				supportingTextVisible: isSupportingTextVisible,
				value
			},
			setState
		] = useImmer<TextInputState>({
			contentSize: {} as TextInputContentSizeChangeEventData['contentSize'],
			state: STATE.ENABLED,
			status: COMPONENT_STATUS.IDLE,
			value: ''
		})

		const id = useId()
		const textInputRef = useRef<TextInput>(null)
		const theme = useTheme()
		const placeholderTextColor =
			state === STATE.DISABLED ?
				hexToRGBA(theme.token.scheme.onSurface)(theme.token.opacity.level5)
			:	theme.token.scheme.onSurfaceVariant

		const onTextInputContentSizeChange = useMemo(
			() =>
				createStableHandlerWithState(handleTextInputContentSizeChange(onContentSizeChange))(
					setState
				)(),
			[onContentSizeChange, setState]
		)

		const onTextInputSupportingTextClose = useMemo(
			() =>
				createStableHandlerWithState(updateTextInputSupportingTextClose)(setState)({
					debounceMillisecond: supportingTextDelay ?? 0
				}),
			[setState, supportingTextDelay]
		)

		const updateTextInputSupportingTextEffect = useMemo(
			() =>
				createStableHandlerWithState(
					updateTextInputSupportingText({
						supportingTextDelay,
						onTextInputSupportingTextClose
					})
				)(setState)(),
			[onTextInputSupportingTextClose, setState, supportingTextDelay]
		)

		const handleTextInputEditableChangeEffect = useMemo(
			() => createStableHandler(handleTextInputEditableChange(textInputRef))(),
			[textInputRef]
		)

		const onTextInputValueWithCallback = useMemo(
			() => createStableHandlerWithState(updateTextInputValueWithCallback(onChangeText))(setState)(),
			[onChangeText, setState]
		)

		const updateTextInputValueEffect = useMemo(
			() => createStableHandlerWithState(updateTextInputValue)(setState)(),
			[setState]
		)

		const onTextInputSupportingTextVisibility = useMemo(
			() =>
				createStableHandlerWithState(
					updateTextInputSupportingTextVisibility(onSupportingTextVisible)
				)(setState)(),
			[onSupportingTextVisible, setState]
		)

		const onTextInputFocusFromHeader = useMemo(
			() => createStableHandler(handleTextInputFocusFromHeader(textInputRef))(),
			[]
		)
		const onTextInputStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (changedState: State) => (event: StateEvent) =>
				handleTextInputStateChange({
					...options,
					content,
					ref: textInputRef,
					state: changedState
				})(setState)(event),
			[content, setState]
		)

		const interactionHandlers = useStateEvent({
			...renderTextInputProps,
			disabled: disabled ?? (typeof editable === 'boolean' ? !editable : undefined),
			onStateEventChange: onTextInputStateEventChange
		})

		const {
			activeIndicatorAnimatedStyle,
			headerAnimatedStyle,
			inputAnimatedStyle,
			labelAnimatedStyle,
			labelTextAnimatedStyle,
			supportingTextAnimatedStyle
		} = useTextInputAnimated({
			density,
			disabled,
			error,
			filled: [rawValue, defaultValue, placeholder, value, content, filled].some(Boolean),
			state,
			type
		})

		useImperativeHandle(ref, () => (textInputRef?.current ?? {}) as TextInput, [textInputRef])

		useEffect(() => {
			handleTextInputEditableChangeEffect(editable)
		}, [editable, handleTextInputEditableChangeEffect])

		useEffect(() => {
			updateTextInputSupportingTextEffect(rawSupportingText)
		}, [updateTextInputSupportingTextEffect, rawSupportingText])

		useEffect(() => {
			updateTextInputValueEffect(rawValue ?? defaultValue)
		}, [defaultValue, updateTextInputValueEffect, rawValue])

		useEffect(() => {
			runAfterInteractions(nextChangeTextEvent)()
		}, [nextChangeTextEvent])

		useEffect(() => {
			runAfterInteractions(nextContentSizeChangeEvent)()
		}, [nextContentSizeChangeEvent])

		useEffect(() => {
			runAfterInteractions(nextSupportingTextVisibleEvent)()
		}, [nextSupportingTextVisibleEvent])

		useEffect(() => {
			runAfterInteractions(nextPressOutEvent)()
		}, [nextPressOutEvent])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return renderTextInput({
			...renderTextInputProps,
			activeIndicatorAnimatedStyle,
			content,
			contentSize,
			density,
			editable,
			eventName,
			headerAnimatedStyle,
			id,
			inputAnimatedStyle,
			interactionHandlers,
			labelAnimatedStyle,
			labelText,
			labelTextAnimatedStyle,
			leading,
			multiline,
			onChangeText: onTextInputValueWithCallback,
			onContentSizeChange: onTextInputContentSizeChange,
			onHeaderFocus: onTextInputFocusFromHeader,
			onSupportingTextVisible: onTextInputSupportingTextVisibility,
			placeholderTextColor,
			ref: textInputRef,
			supportingText,
			supportingTextAnimatedStyle,
			supportingTextVisible: isSupportingTextVisible,
			theme,
			trailing,
			value
		})
	}
)
