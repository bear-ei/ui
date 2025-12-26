import {COMPONENT_STATUS, EVENT_NAME, type State, STATE} from '@/constants'
import {
        type HandleStateEventChangeOptions,
        type StateEvent,
        useClearComponentEvent,
        useInteractionStateEvent
} from '@/hooks'
import {debounce, textSearch} from '@/utils'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput, View} from 'react-native'
import {useImmer} from 'use-immer'
import {
        createSearchLayoutMeasureHandler,
        handleSearchInputStateChange,
        unmountSearchList,
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
                        // listCloseTrailing,
                        // listEmptyElement,
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
                                // layout,
                                listExpanded: isListExpanded,
                                listVisible: isListVisible,
                                nextChangeTextEvent,
                                nextListVisibleEvent,
                                status,
                                value
                        },
                        setState
                ] = useImmer<SearchState>({
                        layout: {} as SearchState['layout'],
                        state: STATE.ENABLED,
                        status: COMPONENT_STATUS.IDLE,
                        value: ''
                })

                useClearComponentEvent(setState)

                const containerRef = useRef<View>(null)
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

                // const onListActive = useMemo(() => handleSearchListActive(inputRef)(rawOnListActive), [rawOnListActive])
                // const onListClose = useMemo(() => handleSearchListClose(inputRef)(rawOnListClose), [rawOnListClose])
                // const onListVisibility = useMemo(() => updateSearchListExpanded(setState), [setState])
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

                // const runEmitList = useMemo(
                //         () =>
                //                 emitSearchList(id)({
                //                         activeKey: listActiveKey,
                //                         closeTrailing: listCloseTrailing,
                //                         containerLayout: layout,
                //                         data: searchListData,
                //                         emptyElement: listEmptyElement,
                //                         itemSize: listItemSize,
                //                         onActive: onListActive,
                //                         onClose: onListClose,
                //                         onVisibility: onListVisibility,
                //                         selectType: listSelectType,
                //                         trailingTriggerOn: listTrailingTriggerOn
                //                 }),
                //         [
                //                 id,
                //                 layout,
                //                 listActiveKey,
                //                 listCloseTrailing,
                //                 listEmptyElement,
                //                 listItemSize,
                //                 listSelectType,
                //                 listTrailingTriggerOn,
                //                 onListActive,
                //                 onListClose,
                //                 onListVisibility,
                //                 searchListData
                //         ]
                // )

                const runLayoutMeasureHandler = useMemo(() => createSearchLayoutMeasureHandler(setState), [setState])
                const runUnmountList = useMemo(() => unmountSearchList(id), [id])
                const runUpdateListData = useMemo(() => updateSearchListData(setState), [setState])
                const runUpdateValue = useMemo(() => updateSearchInputValue(setState), [setState])
                const runUpdateVisibility = useMemo(() => updateSearchListVisibility(setState), [setState])
                const runDebouncedUpdateVisibility = useMemo(
                        () => debounce(updateSearchListVisibility(setState))(150),
                        [setState]
                )

                const {contentAnimatedStyle, inputAnimatedStyle} = useSearchAnimated({
                        disabled,
                        listExpanded: isListExpanded
                })

                useImperativeHandle(ref, () => (inputRef?.current ?? {}) as TextInput, [inputRef])

                // useEffect(() => {
                //         runEmitList(isListVisible)
                // }, [isListVisible, runEmitList])

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

                useEffect(() => {
                        runDebouncedUpdateVisibility(eventName === EVENT_NAME.BLUR ? false : undefined)
                }, [eventName, runDebouncedUpdateVisibility])

                useEffect(() => {
                        runLayoutMeasureHandler(containerRef.current)(isListVisible)
                }, [runLayoutMeasureHandler, isListVisible])

                useEffect(() => {
                        nextChangeTextEvent?.()
                }, [nextChangeTextEvent])

                useEffect(() => {
                        nextListVisibleEvent?.()
                }, [nextListVisibleEvent])

                useEffect(() => () => runUnmountList(), [runUnmountList])

                if (status === COMPONENT_STATUS.IDLE) {
                        return
                }

                return (
                        <RenderSearch
                                {...renderSearchProps}
                                containerRef={containerRef}
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
