import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useStateEvent} from '../../hooks'
import {runAfterInteractions} from '../../utils'
import type {State} from '../Common'
import {
	handleSearchChangeText,
	handleSearchContainerLayout,
	handleSearchListVisible,
	handleSearchStateChange,
	handleSearchTextInputRawChangeText
} from './Search-handle'
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
		{defaultValue, leading, listProps, onChangeText, placeholder, render, value: rawValue, ...renderProps},
		ref
	) => {
		const [
			{status, value, eventName, layout, listVisible, nextPressOutEvent, nextChangeTextEvent},
			setState
		] = useImmer<SearchState>({layout: {} as SearchState['layout'], state: 'enabled', status: 'idle'})

		const id = useId()
		const containerRef = useRef<View>(null)
		const {data} = listProps ?? {}
		const inputRef = useRef<TextInput>(null)
		const theme = useTheme()
		const onSearchListVisible = handleSearchListVisible(setState)
		const onSearchChangeText = handleSearchChangeText({data, onChangeText})(setState)
		const onSearchTextInputRawChangeText = useMemo(
			() => handleSearchTextInputRawChangeText(data)(setState),
			[data, setState]
		)

		const onSearchContainerLayout = useMemo(
			() => handleSearchContainerLayout(setState)(containerRef.current),
			[setState]
		)

		const onStateEventChange =
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleSearchStateChange({...options, ref: inputRef, state})(setState)(event)

		const interactionHandlers = useStateEvent({...renderProps, onStateEventChange})

		useImperativeHandle(ref, () => (inputRef?.current ?? {}) as TextInput, [inputRef])

		useEffect(() => {
			onSearchTextInputRawChangeText(rawValue ?? defaultValue)
		}, [defaultValue, onSearchTextInputRawChangeText, rawValue])

		useEffect(() => {
			if (!data) {
				return
			}

			onSearchListVisible(!data?.length)
		}, [data, onSearchListVisible])

		useEffect(() => {
			onSearchContainerLayout(listVisible)
		}, [listVisible, onSearchContainerLayout])

		useEffect(() => {
			nextChangeTextEvent?.()
		}, [nextChangeTextEvent])

		useEffect(() => {
			runAfterInteractions(nextPressOutEvent)()
		}, [nextPressOutEvent])

		if (status === 'idle') {
			return
		}

		return render({
			...renderProps,
			containerRef,
			eventName,
			id,
			layout,
			leading,
			listProps,
			listVisible,
			onChangeText: onSearchChangeText,
			interactionHandlers,
			placeholder,
			ref: inputRef,
			theme,
			value
		})
	}
)
