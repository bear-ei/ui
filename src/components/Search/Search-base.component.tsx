import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useInteractionStateEvent} from '../../hooks'
import {createStableHandlerWithState, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, STATE, type State} from '../Common'
import {
	createSearchLayoutMeasureHandler,
	handleSearchInputStateChange,
	updateSearchInputValue,
	updateSearchListVisibility,
	updateSearchTextWithMatch
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
		const runUpdateSearchListVisibilityEffect = useMemo(
			() => createStableHandlerWithState(updateSearchListVisibility)(setState)(),
			[setState]
		)

		const onSearchTextWithMatch = useMemo(
			() => createStableHandlerWithState(updateSearchTextWithMatch({data, onChangeText}))(setState)(),
			[data, onChangeText, setState]
		)

		const runUpdateSearchInputValueEffect = useMemo(
			() => createStableHandlerWithState(updateSearchInputValue(data))(setState)(),
			[data, setState]
		)

		const runSearchLayoutMeasureHandlerEffect = useMemo(
			() =>
				createStableHandlerWithState(createSearchLayoutMeasureHandler(containerRef.current))(
					setState
				)(),
			[setState]
		)

		const onSearchInputStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleSearchInputStateChange({...options, ref: inputRef, state})(setState)(event),
			[setState]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderSearchProps,
			onStateEventChange: onSearchInputStateEventChange
		})

		useImperativeHandle(ref, () => (inputRef?.current ?? {}) as TextInput, [inputRef])

		useEffect(() => {
			runUpdateSearchInputValueEffect(rawValue ?? defaultValue)
		}, [runUpdateSearchInputValueEffect, defaultValue, rawValue])

		useEffect(() => {
			if (!data) {
				return
			}

			runUpdateSearchListVisibilityEffect(!data?.length)
		}, [runUpdateSearchListVisibilityEffect, data])

		useEffect(() => {
			runSearchLayoutMeasureHandlerEffect(isListVisible)
		}, [runSearchLayoutMeasureHandlerEffect, isListVisible])

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
			onChangeText: onSearchTextWithMatch,
			placeholder,
			ref: inputRef,
			theme,
			value
		})
	}
)
