import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useInteractionStateEvent} from '../../hooks'
import {runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, STATE, type State} from '../Common'
import {
	createSearchLayoutMeasureHandler,
	handleSearchInputStateChange,
	updateSearchInputValue,
	updateSearchListVisibility,
	updateSearchTextWithMatch
} from './Search.handler'
import type {SearchBaseProps, SearchState} from './Search.interface'

/**
 * TODO:
 * - [macOS] Add support for trailingEvent
 *
 * Later handling may deal with the trailingEvent to move into the event
 * penetration problem. Currently there is no trailingButton application
 * scenario, so we don't deal with it for now.
 */
export const SearchBase = forwardRef<TextInput, SearchBaseProps>(
	(
		{
			defaultValue,
			leading,
			listProps,
			onChangeText: rawOnChangeText,
			placeholder,
			renderSearch,
			value: rawValue,
			...renderSearchProps
		},
		ref
	) => {
		const [
			{
				eventName,
				layout,
				listVisible: isListVisible,
				nextChangeTextEvent,
				nextPressOutEvent,
				status,
				value
			},
			setState
		] = useImmer<SearchState>({
			layout: {} as SearchState['layout'],
			state: STATE.ENABLED,
			status: COMPONENT_STATUS.IDLE
		})

		const {data} = useMemo(() => listProps ?? {}, [listProps])
		const containerRef = useRef<View>(null)
		const id = useId()
		const inputRef = useRef<TextInput>(null)
		const theme = useTheme()
		const onChangeText = useMemo(
			() => updateSearchTextWithMatch({data, onChangeText: rawOnChangeText})(setState),
			[data, rawOnChangeText, setState]
		)

		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleSearchInputStateChange({...options, ref: inputRef, state})(setState)(event),
			[setState]
		)

		const interactionHandlers = useInteractionStateEvent({...renderSearchProps, onStateEventChange})

		useImperativeHandle(ref, () => (inputRef?.current ?? {}) as TextInput, [inputRef])

		const runUpdateVisibility = useMemo(() => updateSearchListVisibility(setState), [setState])
		const runUpdateValue = useMemo(() => updateSearchInputValue(data)(setState), [data, setState])
		const runLayoutMeasureHandler = useMemo(
			() => createSearchLayoutMeasureHandler(containerRef.current)(setState),
			[setState]
		)

		useEffect(() => {
			runUpdateValue(rawValue ?? defaultValue)
		}, [runUpdateValue, defaultValue, rawValue])

		useEffect(() => {
			if (!data) {
				return
			}

			runUpdateVisibility(!data?.length)
		}, [runUpdateVisibility, data])

		useEffect(() => {
			runLayoutMeasureHandler(isListVisible)
		}, [runLayoutMeasureHandler, isListVisible])

		useEffect(() => {
			runAfterInteractions(nextChangeTextEvent)()
		}, [nextChangeTextEvent])

		useEffect(() => {
			runAfterInteractions(nextPressOutEvent)()
		}, [nextPressOutEvent])

		if (status === COMPONENT_STATUS.IDLE) {
			return
		}

		return renderSearch({
			...renderSearchProps,
			containerRef,
			eventName,
			id,
			interactionHandlers,
			layout,
			leading,
			listProps,
			listVisible: isListVisible,
			onChangeText,
			placeholder,
			ref: inputRef,
			theme,
			value
		})
	}
)
