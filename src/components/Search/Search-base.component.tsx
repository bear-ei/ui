import {STATE} from '@/constants'
import {useClearComponentEvent} from '@/hooks'
import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput} from 'react-native'
import {useImmer} from 'use-immer'
import {
        handleSearchActiveKey,
        handleSearchFocusKey,
        updateSearchData,
        updateSearchExpanded,
        updateSearchListVisible,
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
                        filter,
                        leading,
                        onActive: rawOnActive,
                        onChangeText: rawOnChangeText,
                        trailing,
                        value: rawValue,
                        ...renderSearchProps
                },
                ref
        ) => {
                const [
                        {
                                activeKey,
                                data,
                                eventName,
                                expanded: isExpanded,
                                filterValue,
                                listVisible: isListVisible,
                                nextActiveEvent,
                                nextChangeTextEvent,
                                nextListVisibleEvent,
                                value
                        },
                        setState
                ] = useImmer<SearchState>({state: STATE.ENABLED, value: ''})

                useClearComponentEvent(setState)

                const id = useId()
                const inputRef = useRef<TextInput>(null)
                const onChangeText = useMemo(
                        () => updateSearchText(rawOnChangeText)(setState),
                        [rawOnChangeText, setState]
                )

                const onListActiveKey = useMemo(
                        () => handleSearchActiveKey({onActive: rawOnActive, ref: inputRef})(setState),
                        [rawOnActive, setState]
                )

                const onFocusKey = useMemo(() => handleSearchFocusKey(setState), [setState])
                const onUpdateExpanded = useMemo(() => updateSearchExpanded(setState), [setState])
                const onVisible = useMemo(() => updateSearchListVisible(setState), [setState])
                const runUpdateSearchData = useMemo(
                        () => updateSearchData({data: rawData, filter})(setState),
                        [filter, rawData, setState]
                )

                const runUpdateValue = useMemo(() => updateSearchValue(setState), [setState])
                const runUpdateVisible = useMemo(() => updateSearchListVisible(setState), [setState])

                useImperativeHandle(ref, () => (inputRef?.current ?? {}) as TextInput, [inputRef])

                useEffect(() => {
                        runUpdateSearchData(filterValue)
                }, [filterValue, runUpdateSearchData])

                useEffect(() => {
                        runUpdateValue(rawValue ?? defaultValue)
                }, [runUpdateValue, defaultValue, rawValue])

                useEffect(() => {
                        runUpdateVisible(!!value)
                }, [runUpdateVisible, value])

                useEffect(() => {
                        nextActiveEvent?.()
                }, [nextActiveEvent])

                useEffect(() => {
                        nextChangeTextEvent?.()
                }, [nextChangeTextEvent])

                useEffect(() => {
                        nextListVisibleEvent?.()
                }, [nextListVisibleEvent])

                return (
                        <RenderSearch
                                {...renderSearchProps}
                                activeKey={activeKey}
                                data={data}
                                eventName={eventName}
                                expanded={isExpanded}
                                id={id}
                                leadingElement={leading}
                                listVisible={isListVisible}
                                onActive={onListActiveKey}
                                onAnimationFinished={onUpdateExpanded}
                                onChangeText={onChangeText}
                                onFocusKey={onFocusKey}
                                onVisible={onVisible}
                                ref={inputRef}
                                textInputPicker={!!rawData}
                                trailingElement={trailing}
                                value={value}
                        />
                )
        }
)

SearchBase.displayName = 'SearchBase'
