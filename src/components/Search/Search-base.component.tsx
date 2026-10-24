import type {TextInput} from 'react-native'

import {useEffect, useId, useMemo, useRef, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {SearchBaseProps, SearchState} from './Search.interface'

import {useMergeRefs, usePendingEvent} from '../../hooks'
import {
	handleSearchTextChange,
	handleSearchFocus,
	handleSearchMenuClose,
	updateSearchActiveKey,
	updateSearchData,
	updateSearchExpanded,
	updateSearchFocusKey,
	updateSearchMenuVisible,
	updateSearchValue
} from './Search.handler'
import {RenderSearch} from './Search.render'

export const SearchBase: FC<SearchBaseProps> = ({
	data: rawData,
	defaultValue,
	disabled,
	enableLocalFilter,
	leading: rawLeading,
	onActiveKeyChange: rawOnActiveKeyChange,
	onChangeText: rawOnChangeText,
	onClose: rawOnClose,
	onFocusTarget: rawOnFocusTarget,
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

	usePendingEvent('pendingActiveEvent', rawOnActiveKeyChange, {pendingEvent: pendingActiveEvent, setState})
	usePendingEvent('pendingChangeTextEvent', rawOnChangeText, {pendingEvent: pendingChangeTextEvent, setState})
	usePendingEvent('pendingFocusEvent', rawOnFocusTarget, {pendingEvent: pendingFocusEvent, setState})

	const id = useId()
	const inputRef = useRef<TextInput>(null)
	const mergedRef = useMergeRefs([ref, inputRef])
	const leading = data?.find(({itemKey}) => itemKey === focusKey)?.leading ?? rawLeading
	const isTextInputPicker = !!rawData
	const onFocus = useMemo(() => handleSearchFocus(setState, rawOnFocusTarget), [rawOnFocusTarget, setState])
	const onChangeText = useMemo(() => handleSearchTextChange(setState, rawOnChangeText), [rawOnChangeText, setState])
	const onActiveKey = useMemo(
		() => updateSearchActiveKey(setState, {onActiveKeyChange: rawOnActiveKeyChange, ref: inputRef}),
		[rawOnActiveKeyChange, setState]
	)

	const onFocusKeyChange = useMemo(() => updateSearchFocusKey(setState), [setState])
	const onMenuClose = useMemo(() => handleSearchMenuClose(inputRef, rawOnClose), [rawOnClose])
	const onUpdateExpanded = useMemo(() => updateSearchExpanded(setState), [setState])
	const onVisibleChange = useMemo(() => updateSearchMenuVisible(setState), [setState])
	const runUpdateSearchData = useMemo(
		() => updateSearchData(setState, {data: rawData, enableLocalFilter}),
		[enableLocalFilter, rawData, setState]
	)

	const runUpdateValue = useMemo(() => updateSearchValue(setState), [setState])
	const runUpdateVisible = onVisibleChange

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
			isTextInputPicker={isTextInputPicker}
			leading={leading}
			listVisible={isListVisible}
			onActiveKeyChange={onActiveKey}
			onAnimationFinished={onUpdateExpanded}
			onChangeText={onChangeText}
			onFocus={onFocus}
			onFocusKeyChange={onFocusKeyChange}
			onMenuClose={onMenuClose}
			onVisibleChange={onVisibleChange}
			ref={mergedRef}
			value={value}
		/>
	)
}
