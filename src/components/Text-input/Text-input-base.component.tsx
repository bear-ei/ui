import {hexToRGBA} from '@bearei/element-token'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput, TextInputContentSizeChangeEventData} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useInteractionStateEvent} from '../../hooks'
import {createDeferredHandlerWithState, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, STATE, type State} from '../Common'
import {TEXT_INPUT_TYPE} from './Text-input.enum'
import {
	blurTextInputIfEditable,
	clearTextInputEvent,
	createUpdateTextInputContentSize,
	focusTextInput,
	handleTextInputStateChange,
	updateTextInputSupportingText,
	updateTextInputSupportingTextClose,
	updateTextInputSupportingTextVisibility,
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
			density,
			disabled,
			editable,
			error,
			filled,
			labelText = 'Label',
			leading,
			multiline,
			onChangeText: rawOnChangeText,
			onContentSizeChange: rawOnContentSizeChange,
			onSupportingTextVisibility: rawOnSupportingTextVisibility,
			placeholder,
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
				nextSupportingTextCloseEvent,
				nextSupportingTextVisibilityEvent,
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

		const onContentSizeChange = useMemo(
			() => createUpdateTextInputContentSize(rawOnContentSizeChange)(setState),
			[rawOnContentSizeChange, setState]
		)

		const onSupportingTextClose = useMemo(
			() =>
				createDeferredHandlerWithState(updateTextInputSupportingTextClose)(setState)({
					debounceMillisecond: supportingTextDelay ?? 0
				}),
			[setState, supportingTextDelay]
		)

		const onChangeText = useMemo(
			() => updateTextInputValueWithCallback(rawOnChangeText)(setState),
			[rawOnChangeText, setState]
		)

		const onSupportingTextVisibility = useMemo(
			() => updateTextInputSupportingTextVisibility(rawOnSupportingTextVisibility)(setState),
			[rawOnSupportingTextVisibility, setState]
		)

		const onHeaderFocus = useMemo(() => focusTextInput(textInputRef), [])
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (changedState: State) => (event: StateEvent) =>
				handleTextInputStateChange({
					...options,
					content,
					ref: textInputRef,
					state: changedState
				})(setState)(event),
			[content, setState]
		)

		const interactionHandlers = useInteractionStateEvent({
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
			status,
			type
		})

		useImperativeHandle(ref, () => (textInputRef?.current ?? {}) as TextInput, [textInputRef])

		const runUpdateSupportingText = useMemo(
			() => updateTextInputSupportingText({onSupportingTextClose, supportingTextDelay})(setState),
			[onSupportingTextClose, setState, supportingTextDelay]
		)

		const runBlurIfEditable = useMemo(() => blurTextInputIfEditable(textInputRef), [textInputRef])
		const runClearTextInputEvent = useMemo(
			() => createDeferredHandlerWithState(clearTextInputEvent)(setState)(),
			[setState]
		)

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
			runAfterInteractions(nextChangeTextEvent)().then(() => runClearTextInputEvent('changeText'))
		}, [nextChangeTextEvent, runClearTextInputEvent])

		useEffect(() => {
			runAfterInteractions(nextContentSizeChangeEvent)().then(() =>
				runClearTextInputEvent('contentSizeChange')
			)
		}, [nextContentSizeChangeEvent, runClearTextInputEvent])

		useEffect(() => {
			runAfterInteractions(nextSupportingTextVisibilityEvent)().then(() =>
				runClearTextInputEvent('supportingTextVisibility')
			)
		}, [nextSupportingTextVisibilityEvent, runClearTextInputEvent])

		useEffect(() => {
			runAfterInteractions(nextPressOutEvent)().then(() => runClearTextInputEvent('pressOut'))
		}, [nextPressOutEvent, runClearTextInputEvent])

		useEffect(() => {
			runAfterInteractions(nextSupportingTextCloseEvent)().then(() =>
				runClearTextInputEvent('supportingTextClose')
			)
		}, [nextSupportingTextCloseEvent, runClearTextInputEvent])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return (
			<RenderTextInput
				{...renderTextInputProps}
				activeIndicatorAnimatedStyle={activeIndicatorAnimatedStyle}
				content={content}
				contentSize={contentSize}
				density={density}
				editable={editable}
				eventName={eventName}
				headerAnimatedStyle={headerAnimatedStyle}
				id={id}
				inputAnimatedStyle={inputAnimatedStyle}
				interactionHandlers={interactionHandlers}
				labelAnimatedStyle={labelAnimatedStyle}
				labelText={labelText}
				labelTextAnimatedStyle={labelTextAnimatedStyle}
				leading={leading}
				multiline={multiline}
				onChangeText={onChangeText}
				onContentSizeChange={onContentSizeChange}
				onHeaderFocus={onHeaderFocus}
				onSupportingTextVisibility={onSupportingTextVisibility}
				placeholderTextColor={placeholderTextColor}
				ref={textInputRef}
				supportingText={supportingText}
				supportingTextAnimatedStyle={supportingTextAnimatedStyle}
				supportingTextVisible={isSupportingTextVisible}
				trailing={trailing}
				value={value}
			/>
		)
	}
)
