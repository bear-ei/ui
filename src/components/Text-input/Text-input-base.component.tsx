import {hexToRGBA} from '@bearei/material-token'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput, TextInputContentSizeChangeEventData} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {ProcessStateEventChangeOptions, StateEvent} from '../../hooks'
import {useStateEvent} from '../../hooks'
import {createHandler, createHandlerWithUpdater, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, STATE, type State} from '../Common'
import {
	handleTextInputChangeText,
	handleTextInputContentSizeChange,
	handleTextInputEditableChange,
	handleTextInputRawChangeText,
	handleTextInputStateChange,
	handleTextInputSupportingText,
	handleTextInputSupportingTextClose,
	handleTextInputSupportingTextVisible,
	handleTouchableHeaderFocus
} from './Text-input-handle'
import {TEXT_INPUT_TYPE} from './Text-input.enum'
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
				createHandlerWithUpdater(handleTextInputContentSizeChange(onContentSizeChange))(
					setState
				)(),
			[onContentSizeChange, setState]
		)
		const onTextInputSupportingTextClose = useMemo(
			() =>
				createHandlerWithUpdater(handleTextInputSupportingTextClose)(setState)({
					debounceMillisecond: supportingTextDelay ?? 0
				}),
			[setState, supportingTextDelay]
		)

		const onTextInputSupportingText = useMemo(
			() =>
				createHandlerWithUpdater(
					handleTextInputSupportingText({
						supportingTextDelay,
						onTextInputSupportingTextClose
					})
				)(setState)(),
			[onTextInputSupportingTextClose, setState, supportingTextDelay]
		)

		const onTextInputEditableChange = useMemo(
			() => createHandler(handleTextInputEditableChange(textInputRef))(),
			[textInputRef]
		)

		const onTextInputChangeText = useMemo(
			() => createHandlerWithUpdater(handleTextInputChangeText(onChangeText))(setState)(),
			[onChangeText, setState]
		)

		const onTextInputChangeTextStatus = useMemo(
			() => createHandlerWithUpdater(handleTextInputRawChangeText)(setState)(),
			[setState]
		)

		const onTextInputSupportingTextVisible = useMemo(
			() =>
				createHandlerWithUpdater(handleTextInputSupportingTextVisible(onSupportingTextVisible))(
					setState
				)(),
			[onSupportingTextVisible, setState]
		)

		const onTouchableHeaderFocus = useMemo(
			() => createHandler(handleTouchableHeaderFocus(textInputRef))(),
			[]
		)
		const onStateEventChange = useCallback(
			(options: ProcessStateEventChangeOptions) => (changedState: State) => (event: StateEvent) =>
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
			density,
			disabled,
			error,
			filled: [rawValue, defaultValue, placeholder, value, content, filled].some(Boolean),
			state,
			type
		})

		useImperativeHandle(ref, () => (textInputRef?.current ?? {}) as TextInput, [textInputRef])

		useEffect(() => {
			onTextInputEditableChange(editable)
		}, [editable, onTextInputEditableChange])

		useEffect(() => {
			onTextInputSupportingText(rawSupportingText)
		}, [onTextInputSupportingText, rawSupportingText])

		useEffect(() => {
			onTextInputChangeTextStatus(rawValue ?? defaultValue)
		}, [defaultValue, onTextInputChangeTextStatus, rawValue])

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
			onChangeText: onTextInputChangeText,
			onContentSizeChange: onTextInputContentSizeChange,
			onHeaderFocus: onTouchableHeaderFocus,
			onSupportingTextVisible: onTextInputSupportingTextVisible,
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
