import {COMPONENT_STATUS, type State, STATE} from '@/constants'
import {
        type HandleStateEventChangeOptions,
        type StateEvent,
        useClearComponentEvent,
        useInteractionStateEvent
} from '@/hooks'
import {textSearch} from '@/utils'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput} from 'react-native'
import {useImmer} from 'use-immer'
import {
        handleSearchInputStateChange,
        updateSearchInputValue,
        updateSearchListData,
        updateSearchListVisibility,
        updateSearchText
} from './Search.handler'
import type {SearchBaseProps, SearchState} from './Search.interface'
import {RenderSearch} from './Search.render'
import {useSearchAnimated} from './use-search-animated.hook'

/**
 * TODO:
 *
 * - [macOS] Add support for trailingEvent
 *
 * Later handling may deal with the trailingEvent to move into the event
 * penetration problem. Currently there is no trailingButton application
 * scenario, so we don't deal with it for now.
 */
export const SearchBase = forwardRef<TextInput, SearchBaseProps>(
        (
                {
                        data: rawData,
                        defaultValue,
                        disabled,
                        filter,
                        leading,
                        // listActiveKey,
                        // listItemSize,
                        // listSelectType,
                        // listTrailingTriggerOn,
                        onChangeText: rawOnChangeText,
                        // onListActive: rawOnListActive,
                        // onListClose: rawOnListClose,
                        trailing,
                        value: rawValue,

                        ...renderSearchProps
                },
                ref
        ) => {
                const [
                        {
                                data,
                                elevation,
                                eventName,
                                listExpanded: isListExpanded,
                                listVisible: isListVisible,
                                nextChangeTextEvent,
                                nextListVisibleEvent,
                                status,
                                value
                        },
                        setState
                ] = useImmer<SearchState>({
                        state: STATE.ENABLED,
                        status: COMPONENT_STATUS.IDLE,
                        value: ''
                })

                useClearComponentEvent(setState)

                const id = useId()
                const inputRef = useRef<TextInput>(null)
                const searchListData = useMemo(
                        () =>
                                filter ?
                                        value && data ?
                                                textSearch(data)(['headline', 'supporting'])(value)
                                        :       []
                                :       data,
                        [data, filter, value]
                )

                const onChangeText = useMemo(
                        () => updateSearchText(rawOnChangeText)(setState),
                        [rawOnChangeText, setState]
                )

                const onStateEventChange = useCallback(
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleSearchInputStateChange({...options, ref: inputRef, state})(setState)(event),
                        [setState]
                )

                const interactionHandlers = useInteractionStateEvent({
                        ...renderSearchProps,
                        disabled,
                        onStateEventChange
                })

                const runUpdateListData = useMemo(() => updateSearchListData(setState), [setState])
                const runUpdateValue = useMemo(() => updateSearchInputValue(setState), [setState])
                const runUpdateVisibility = useMemo(() => updateSearchListVisibility(setState), [setState])
                // const runDebouncedUpdateVisibility = useMemo(
                //         () => debounce(updateSearchListVisibility(setState))(150),
                //         [setState]
                // )

                const {contentAnimatedStyle, inputAnimatedStyle} = useSearchAnimated({
                        disabled,
                        listExpanded: isListExpanded
                })

                useImperativeHandle(ref, () => (inputRef?.current ?? {}) as TextInput, [inputRef])

                useEffect(() => {
                        runUpdateListData(rawData)
                }, [rawData, runUpdateListData])

                useEffect(() => {
                        runUpdateValue(rawValue ?? defaultValue)
                }, [runUpdateValue, defaultValue, rawValue])

                useEffect(() => {
                        if (searchListData) {
                                runUpdateVisibility(!!searchListData?.length)
                        }
                }, [runUpdateVisibility, searchListData])

                // useEffect(() => {
                //         runDebouncedUpdateVisibility(eventName === EVENT_NAME.BLUR ? false : undefined)
                // }, [eventName, runDebouncedUpdateVisibility])

                useEffect(() => {
                        nextChangeTextEvent?.()
                }, [nextChangeTextEvent])

                useEffect(() => {
                        nextListVisibleEvent?.()
                }, [nextListVisibleEvent])

                if (status === COMPONENT_STATUS.IDLE) {
                        return
                }

                return (
                        <RenderSearch
                                {...renderSearchProps}
                                contentAnimatedStyle={contentAnimatedStyle}
                                data={data}
                                disabled={disabled}
                                elevation={elevation}
                                eventName={eventName}
                                id={id}
                                inputAnimatedStyle={inputAnimatedStyle}
                                interactionHandlers={interactionHandlers}
                                leadingElement={leading}
                                listVisible={isListVisible}
                                onChangeText={onChangeText}
                                ref={inputRef}
                                trailingElement={trailing}
                                value={value}
                        />
                )
        }
)

SearchBase.displayName = 'SearchBase'
