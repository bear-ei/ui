import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useStateEvent} from '../../hooks'
import {createHandler, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, STATE, type State} from '../Common'
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
		const {data} = useMemo(() => listProps ?? {}, [listProps])
		const inputRef = useRef<TextInput>(null)
		const theme = useTheme()
		const onSearchListVisible = useMemo(
			() => createHandler(handleSearchListVisible)(setState)(),
			[setState]
		)

		const onSearchChangeText = useMemo(
			() => createHandler(handleSearchChangeText({data, onChangeText}))(setState)(),
			[data, onChangeText, setState]
		)

		const onSearchTextInputRawChangeText = useMemo(
			() => createHandler(handleSearchTextInputRawChangeText(data))(setState)(),
			[data, setState]
		)

		const onSearchContainerLayout = useMemo(
			() => createHandler(handleSearchContainerLayout(containerRef.current))(setState)(),
			[setState]
		)

		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleSearchStateChange({...options, ref: inputRef, state})(setState)(event),
			[setState]
		)

		const interactionHandlers = useStateEvent({...renderSearchProps, onStateEventChange})

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
			onSearchContainerLayout(isListVisible)
		}, [isListVisible, onSearchContainerLayout])

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
			onChangeText: onSearchChangeText,
			placeholder,
			ref: inputRef,
			theme,
			value
		})
	}
)
