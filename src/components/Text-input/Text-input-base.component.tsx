import type {TextInput} from 'react-native'

import {type FC, useCallback, useEffect, useId, useMemo, useRef} from 'react'
import {useImmer} from 'use-immer'

import type {TextInputBaseProps, TextInputState} from './Text-input.interface'

import {COMPONENT_STATUS, type InteractionState, INTERACTION_STATE} from '../../constants'
import {
	type HandleInteractionStateChangeOptions,
	type InteractionEvent,
	useInteractionStateEvent,
	useMergeRefs,
	usePendingEvent
} from '../../hooks'
import {debounce} from '../../utils'
import {TEXT_INPUT_TYPE} from './Text-input.enum'
import {
	blurTextInputIfEditable,
	handleTextInputContentSizeChange,
	focusTextInput,
	handleTextInputStateChange,
	handleTextInputSupportingTextAnimationFinished,
	handleTextInputTextChange,
	updateTextInputSupportingText,
	updateTextInputSupportingTextClose,
	updateTextInputValue
} from './Text-input.handler'
import {RenderTextInput} from './Text-input.render'
import {useTextInputAnimated} from './use-text-input-animated.hook'

export const TextInputBase: FC<TextInputBaseProps> = ({
	defaultValue,
	disabled,
	editable,
	error,
	headerContent,
	leading,
	multiline,
	onChangeText: rawOnChangeText,
	onContentSizeChange: rawOnContentSizeChange,
	onSupportingTextAnimationFinished: rawOnSupportingTextAnimationFinished,
	ref,
	supportingText: rawSupportingText,
	supportingTextDelay = 0,
	trailing,
	type = TEXT_INPUT_TYPE.FILLED,
	value: rawValue,
	...renderTextInputProps
}) => {
	const [
		{
			contentSize,
			eventName,
			interactionState,
			pendingChangeTextEvent,
			pendingContentSizeChangeEvent,
			pendingSupportingTextAnimationFinishedEvent,
			pendingSupportingTextCloseEvent,
			status,
			supportingText,
			supportingTextVisible: isSupportingTextVisible,
			value
		},
		setState
	] = useImmer<TextInputState>({
		contentSize: {height: 0, width: 0},
		interactionState: INTERACTION_STATE.ENABLED,
		status: COMPONENT_STATUS.IDLE,
		value: rawValue ?? defaultValue ?? ''
	})

	usePendingEvent('pendingChangeTextEvent', rawOnChangeText, {pendingEvent: pendingChangeTextEvent, setState})
	usePendingEvent('pendingContentSizeChangeEvent', rawOnContentSizeChange, {
		pendingEvent: pendingContentSizeChangeEvent,
		setState
	})

	usePendingEvent('pendingSupportingTextAnimationFinishedEvent', rawOnSupportingTextAnimationFinished, {
		pendingEvent: pendingSupportingTextAnimationFinishedEvent,
		setState
	})

	const id = useId()
	const textInputRef = useRef<TextInput>(null)
	const mergedRef = useMergeRefs([ref, textInputRef])
	const onContentSizeChange = useMemo(
		() => handleTextInputContentSizeChange(setState, rawOnContentSizeChange),
		[rawOnContentSizeChange, setState]
	)

	const onSupportingTextClose = useMemo(
		() => debounce(updateTextInputSupportingTextClose(setState), supportingTextDelay),
		[setState, supportingTextDelay]
	)

	usePendingEvent('pendingSupportingTextCloseEvent', onSupportingTextClose, {
		pendingEvent: pendingSupportingTextCloseEvent,
		setState
	})

	const onChangeText = useMemo(
		() => handleTextInputTextChange(setState, rawOnChangeText),
		[rawOnChangeText, setState]
	)

	const onSupportingTextAnimationFinished = useMemo(
		() => handleTextInputSupportingTextAnimationFinished(setState, rawOnSupportingTextAnimationFinished),
		[rawOnSupportingTextAnimationFinished, setState]
	)

	const onHeaderFocus = focusTextInput(textInputRef)
	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, changedState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handleTextInputStateChange(event, setState, {
				...options,
				headerContent,
				interactionState: changedState,
				ref: textInputRef
			}),
		[headerContent, setState]
	)

	const interactionHandlers = useInteractionStateEvent({
		...renderTextInputProps,
		disabled: disabled ?? (typeof editable === 'boolean' ? !editable : undefined),
		onInteractionStateChange
	})

	const {activeIndicatorAnimatedStyle, headerAnimatedStyle, inputAnimatedStyle} = useTextInputAnimated({
		disabled,
		error,
		interactionState,
		status,
		type
	})

	const runUpdateSupportingText = useMemo(
		() => updateTextInputSupportingText(setState, {onSupportingTextClose, supportingTextDelay}),
		[onSupportingTextClose, setState, supportingTextDelay]
	)

	const runBlurIfEditable = useMemo(() => blurTextInputIfEditable(textInputRef), [textInputRef])
	const runUpdateValue = useMemo(() => updateTextInputValue(setState), [setState])

	useEffect(() => () => onSupportingTextClose.cancel(), [onSupportingTextClose])
	useEffect(() => {
		runBlurIfEditable(editable)
	}, [runBlurIfEditable, editable])

	useEffect(() => {
		runUpdateSupportingText(rawSupportingText)
	}, [runUpdateSupportingText, rawSupportingText])

	useEffect(() => {
		runUpdateValue(rawValue)
	}, [runUpdateValue, rawValue])

	return (
		<RenderTextInput
			{...renderTextInputProps}
			activeIndicatorAnimatedStyle={activeIndicatorAnimatedStyle}
			contentSize={contentSize}
			disabled={disabled}
			editable={editable}
			error={error}
			eventName={eventName}
			headerAnimatedStyle={headerAnimatedStyle}
			headerContent={headerContent}
			id={id}
			inputAnimatedStyle={inputAnimatedStyle}
			interactionHandlers={interactionHandlers}
			leadingElement={leading}
			multiline={multiline}
			onChangeText={onChangeText}
			onContentSizeChange={onContentSizeChange}
			onHeaderFocus={onHeaderFocus}
			onSupportingTextAnimationFinished={onSupportingTextAnimationFinished}
			ref={mergedRef}
			supportingText={supportingText}
			supportingTextVisible={isSupportingTextVisible}
			trailingElement={trailing}
			value={value}
		/>
	)
}
