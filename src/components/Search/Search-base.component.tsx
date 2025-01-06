import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {TextInput, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {State} from '../Common'
import {
        handleSearchChangeText,
        handleSearchContainerLayout,
        handleSearchListVisible,
        handleSearchStateChange,
        handleSearchTextInputRawChangeText
} from './Search-handle'
import {SearchListProps} from './Search-list'
import {SearchBaseProps, SearchState} from './Search.interface'

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
                        listProps = {} as SearchListProps,
                        onChangeText,
                        placeholder,
                        render,
                        value: rawValue,
                        ...renderProps
                },
                ref
        ) => {
                const [
                        {status, value, eventName, layout, listVisible, nextPressOutEvent, nextChangeTextEvent},
                        setState
                ] = useImmer<SearchState>({layout: {} as SearchState['layout'], state: 'enabled', status: 'idle'})

                const containerRef = useRef<View>(null)
                const id = useId()
                const {data} = listProps
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
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleSearchStateChange({...options, ref: inputRef, state})(setState)(event)

                const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})

                useImperativeHandle(ref, () => (inputRef?.current ? inputRef?.current : {}) as TextInput, [])

                useEffect(() => {
                        onSearchTextInputRawChangeText(rawValue ?? defaultValue)
                }, [defaultValue, onSearchTextInputRawChangeText, rawValue])

                useEffect(() => {
                        if (data) {
                                onSearchListVisible(!data?.length)
                        }
                }, [data, onSearchListVisible])

                useEffect(() => {
                        onSearchContainerLayout(listVisible)
                }, [listVisible, onSearchContainerLayout])

                useEffect(() => {
                        nextPressOutEvent?.()
                }, [nextPressOutEvent])

                useEffect(() => {
                        nextChangeTextEvent?.()
                }, [nextChangeTextEvent])

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
                        onStateEvent,
                        placeholder,
                        ref: inputRef,
                        theme,
                        value
                })
        }
)
