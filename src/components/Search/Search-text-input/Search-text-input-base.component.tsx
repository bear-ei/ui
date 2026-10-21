import {forwardRef, useCallback, useEffect, useId, useMemo, useRef} from 'react'
import type {TextInput} from 'react-native'
import {useImmer} from 'use-immer'

import {COMPONENT_STATUS, STATE, type State} from '../../../constants'
import {
	useInteractionStateEvent,
	useMergeRefs,
	usePendingEvent,
	type HandleStateEventChangeOptions,
	type StateEvent
} from '../../../hooks'

import {
	handleSearchTextInputStateChange,
	updateSearchTextInputText,
	updateSearchTextInputValue
} from './Search-text-input.handler'
import type {SearchTextInputBaseProps, SearchTextInputState} from './Search-text-input.interface'
import {RenderSearchTextInput} from './Search-text-input.render'
import {useSearchTextInputAnimated} from './use-search-text-input-animated.hook'

export const SearchTextInputBase = forwardRef<TextInput, SearchTextInputBaseProps>(
	(
		{
			defaultValue,
			disabled,
			expanded: isExpanded,
			leading,
			onChangeText: rawOnChangeText,
			trailing,
			value: rawValue,
			...renderSearchProps
		},
		ref
	) => {
		const [{eventName, pendingChangeTextEvent, status, value}, setState] = useImmer<SearchTextInputState>({
			state: STATE.ENABLED,
			status: COMPONENT_STATUS.IDLE,
			value: rawValue ?? defaultValue
		})

		usePendingEvent({
			eventKey: 'pendingChangeTextEvent',
			func: rawOnChangeText,
			pendingEvent: pendingChangeTextEvent,
			setState
		})

		const id = useId()
		const inputRef = useRef<TextInput>(null)
		const mergedRef = useMergeRefs([ref, inputRef])

		const onChangeText = useMemo(
			() => updateSearchTextInputText(rawOnChangeText)(setState),
			[rawOnChangeText, setState]
		)

		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleSearchTextInputStateChange({...options, ref: inputRef, state})(setState)(event),
			[setState]
		)

		const interactionHandlers = useInteractionStateEvent({...renderSearchProps, disabled, onStateEventChange})
		const runUpdateValue = useMemo(() => updateSearchTextInputValue(setState), [setState])
		const {contentAnimatedStyle, inputAnimatedStyle} = useSearchTextInputAnimated({
			disabled,
			expanded: isExpanded
		})

		useEffect(() => {
			runUpdateValue(rawValue)
		}, [runUpdateValue, rawValue])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return (
			<RenderSearchTextInput
				{...renderSearchProps}
				contentAnimatedStyle={contentAnimatedStyle}
				disabled={disabled}
				eventName={eventName}
				id={id}
				inputAnimatedStyle={inputAnimatedStyle}
				interactionHandlers={interactionHandlers}
				leadingElement={leading}
				onChangeText={onChangeText}
				ref={mergedRef}
				trailingElement={trailing}
				value={value}
			/>
		)
	}
)

SearchTextInputBase.displayName = 'SearchTextInputBase'
