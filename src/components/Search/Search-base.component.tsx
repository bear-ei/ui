import {forwardRef, useEffect, useId, useMemo, useRef} from 'react'
import type {TextInput} from 'react-native'
import {useImmer} from 'use-immer'

import {useMergeRefs, usePendingEvent} from '../../hooks'

import {
	handleSearchActiveKey,
	handleSearchFocus,
	handleSearchFocusKey,
	handleSearchMenuClose,
	updateSearchData,
	updateSearchExpanded,
	updateSearchMenuVisible,
	updateSearchText,
	updateSearchValue
} from './Search.handler'
import type {SearchBaseProps, SearchState} from './Search.interface'
import {RenderSearch} from './Search.render'

export const SearchBase = forwardRef<TextInput, SearchBaseProps>(
	(
		{
			data: rawData,
			defaultValue,
			disabled,
			filter,
			leading: rawLeading,
			onActive: rawOnActive,
			onChangeText: rawOnChangeText,
			onClose: rawOnClose,
			onFocus: rawOnFocus,
			value: rawValue,
			...renderSearchProps
		},
		ref
	) => {
		const [
			{
				activeKey,
				data,
				expanded: isExpanded,
				filterValue,
				focusKey,
				listVisible: isListVisible,
				pendingActiveEvent,
				pendingChangeTextEvent,
				pendingFocusEvent,
				value
			},
			setState
		] = useImmer<SearchState>({value: rawValue ?? defaultValue, data: rawData})

		usePendingEvent({
			eventKey: 'pendingActiveEvent',
			func: rawOnActive,
			pendingEvent: pendingActiveEvent,
			setState
		})

		usePendingEvent({
			eventKey: 'pendingChangeTextEvent',
			func: rawOnChangeText,
			pendingEvent: pendingChangeTextEvent,
			setState
		})

		usePendingEvent({
			eventKey: 'pendingFocusEvent',
			func: rawOnFocus,
			pendingEvent: pendingFocusEvent,
			setState
		})

		const id = useId()
		const inputRef = useRef<TextInput>(null)
		const mergedRef = useMergeRefs([ref, inputRef])
		const leading = data?.find(({indexKey}) => indexKey === focusKey)?.leading ?? rawLeading
		const isTextInputPicker = !!rawData
		const onFocus = useMemo(() => handleSearchFocus(rawOnFocus)(setState), [rawOnFocus, setState])
		const onChangeText = useMemo(() => updateSearchText(rawOnChangeText)(setState), [rawOnChangeText, setState])
		const onActiveKey = useMemo(
			() => handleSearchActiveKey({onActive: rawOnActive, ref: inputRef})(setState),
			[rawOnActive, setState]
		)

		const onFocusKey = useMemo(() => handleSearchFocusKey(setState), [setState])
		const onMenuClose = useMemo(() => handleSearchMenuClose(inputRef)(rawOnClose), [rawOnClose])
		const onUpdateExpanded = useMemo(() => updateSearchExpanded(setState), [setState])
		const onVisible = useMemo(() => updateSearchMenuVisible(setState), [setState])

		const runUpdateSearchData = useMemo(
			() => updateSearchData({data: rawData, filter})(setState),
			[filter, rawData, setState]
		)

		const runUpdateValue = useMemo(() => updateSearchValue(setState), [setState])
		const runUpdateVisible = onVisible

		useEffect(() => {
			runUpdateSearchData(filterValue)
		}, [filterValue, runUpdateSearchData])

		useEffect(() => {
			runUpdateValue(rawValue)
		}, [runUpdateValue, rawValue])

		useEffect(() => {
			if (isTextInputPicker) {
				runUpdateVisible(!!value)
			}
		}, [isTextInputPicker, runUpdateVisible, value])

		return (
			<RenderSearch
				{...renderSearchProps}
				activeKey={activeKey}
				data={data}
				disabled={disabled}
				expanded={isExpanded}
				id={id}
				leading={leading}
				listVisible={isListVisible}
				onActive={onActiveKey}
				onAnimationFinished={onUpdateExpanded}
				onChangeText={onChangeText}
				onFocus={onFocus}
				onFocusKey={onFocusKey}
				onMenuClose={onMenuClose}
				onVisible={onVisible}
				ref={mergedRef}
				textInputPicker={isTextInputPicker}
				value={value}
			/>
		)
	}
)

SearchBase.displayName = 'SearchBase'
