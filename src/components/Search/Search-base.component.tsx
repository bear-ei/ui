import type {TextInput} from 'react-native'

import {useEffect, useId, useMemo, useRef, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {SearchBaseProps, SearchState} from './Search.interface'

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
import {RenderSearch} from './Search.render'

export const SearchBase: FC<SearchBaseProps> = ({
	data: rawData,
	defaultValue,
	disabled,
	filter,
	leading: rawLeading,
	onActive: rawOnActive,
	onChangeText: rawOnChangeText,
	onClose: rawOnClose,
	onFocus: rawOnFocus,
	ref,
	value: rawValue,
	...renderSearchProps
}) => {
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
	] = useImmer<SearchState>({data: rawData, value: rawValue ?? defaultValue})

	usePendingEvent('pendingActiveEvent', rawOnActive, {pendingEvent: pendingActiveEvent, setState})
	usePendingEvent('pendingChangeTextEvent', rawOnChangeText, {pendingEvent: pendingChangeTextEvent, setState})
	usePendingEvent('pendingFocusEvent', rawOnFocus, {pendingEvent: pendingFocusEvent, setState})

	const id = useId()
	const inputRef = useRef<TextInput>(null)
	const mergedRef = useMergeRefs([ref, inputRef])
	const leading = data?.find(({indexKey}) => indexKey === focusKey)?.leading ?? rawLeading
	const isTextInputPicker = !!rawData
	const onFocus = useMemo(() => handleSearchFocus(setState, rawOnFocus), [rawOnFocus, setState])
	const onChangeText = useMemo(() => updateSearchText(setState, rawOnChangeText), [rawOnChangeText, setState])
	const onActiveKey = useMemo(
		() => handleSearchActiveKey(setState, {onActive: rawOnActive, ref: inputRef}),
		[rawOnActive, setState]
	)

	const onFocusKey = useMemo(() => handleSearchFocusKey(setState), [setState])
	const onMenuClose = useMemo(() => handleSearchMenuClose(inputRef, rawOnClose), [rawOnClose])
	const onUpdateExpanded = useMemo(() => updateSearchExpanded(setState), [setState])
	const onVisible = useMemo(() => updateSearchMenuVisible(setState), [setState])
	const runUpdateSearchData = useMemo(
		() => updateSearchData(setState, {data: rawData, filter}),
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
