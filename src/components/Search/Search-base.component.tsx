import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useStateEvent} from '../../hooks'
import {createStableHandlerWithState, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, STATE, type State} from '../Common'
import {
	handleSearchContainerLayoutChange,
	handleSearchInputStateChange,
	handleSearchTextChange,
	updateSearchInputValue,
	updateSearchListVisible
} from './Search.handle'
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
			onChangeText,
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

		const id = useId()
		const containerRef = useRef<View>(null)
		const {data} = listProps ?? {}
		const inputRef = useRef<TextInput>(null)
		const theme = useTheme()
		const updateSearchListVisibleEffect = useMemo(
			() => createStableHandlerWithState(updateSearchListVisible)(setState)(),
			[setState]
		)

		const onSearchTextChange = useMemo(
			() => createStableHandlerWithState(handleSearchTextChange({data, onChangeText}))(setState)(),
			[data, onChangeText, setState]
		)

		const updateSearchInputValueEffect = useMemo(
			() => createStableHandlerWithState(updateSearchInputValue(data))(setState)(),
			[data, setState]
		)

		const handleSearchContainerLayoutChangeEffect = useMemo(
			() =>
				createStableHandlerWithState(handleSearchContainerLayoutChange(containerRef.current))(
					setState
				)(),
			[setState]
		)

		const onSearchInputStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleSearchInputStateChange({...options, ref: inputRef, state})(setState)(event),
			[setState]
		)

		const interactionHandlers = useStateEvent({
			...renderSearchProps,
			onStateEventChange: onSearchInputStateEventChange
		})

		useImperativeHandle(ref, () => (inputRef?.current ?? {}) as TextInput, [inputRef])

		useEffect(() => {
			updateSearchInputValueEffect(rawValue ?? defaultValue)
		}, [defaultValue, rawValue, updateSearchInputValueEffect])

		useEffect(() => {
			if (!data) {
				return
			}

			updateSearchListVisibleEffect(!data?.length)
		}, [data, updateSearchListVisibleEffect])

		useEffect(() => {
			handleSearchContainerLayoutChangeEffect(isListVisible)
		}, [handleSearchContainerLayoutChangeEffect, isListVisible])

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
			onChangeText: onSearchTextChange,
			placeholder,
			ref: inputRef,
			theme,
			value
		})
	}
)
