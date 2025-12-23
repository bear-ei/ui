import {COMPONENT_STATUS, type State, STATE} from '@/constants'
import {
        type HandleStateEventChangeOptions,
        type StateEvent,
        useClearComponentEvent,
        useInteractionStateEvent
} from '@/hooks'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput, View} from 'react-native'
import {useImmer} from 'use-immer'
import {
        createSearchLayoutMeasureHandler,
        emitSearchList,
        handleSearchInputStateChange,
        unmountSearchList,
        updateSearchInputValue,
        updateSearchListExpanded,
        updateSearchListVisibility,
        updateSearchTextWithMatch
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
                        defaultValue,
                        disabled,
                        leading,
                        data: rawData,
                        onChangeText: rawOnChangeText,
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
                                layout,
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
                const onChangeText = useMemo(
                        () => updateSearchTextWithMatch({data: rawData, onChangeText: rawOnChangeText})(setState),
                        [rawData, rawOnChangeText, setState]
                )

                const onListVisibility = useMemo(() => updateSearchListExpanded(setState), [setState])
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

                const runEmitList = useMemo(
                        () => emitSearchList(id)({containerLayout: layout, onVisibility: onListVisibility, data}),
                        [data, id, layout, onListVisibility]
                )

                const runLayoutMeasureHandler = useMemo(() => createSearchLayoutMeasureHandler(setState), [setState])
                const runUnmountList = useMemo(() => unmountSearchList(id), [id])
                const runUpdateValue = useMemo(() => updateSearchInputValue(rawData)(setState), [rawData, setState])
                const runUpdateVisibility = useMemo(() => updateSearchListVisibility(setState), [setState])
                const {contentAnimatedStyle, inputAnimatedStyle} = useSearchAnimated({
                        disabled,
                        listExpanded: isListExpanded
                })

                useImperativeHandle(ref, () => (inputRef?.current ?? {}) as TextInput, [inputRef])

                useEffect(() => {
                        runEmitList(isListVisible)
                }, [isListVisible, runEmitList])

                useEffect(() => {
                        runUpdateValue(rawValue ?? defaultValue)
                }, [runUpdateValue, defaultValue, rawValue])

                useEffect(() => {
                        runUpdateVisibility(!!data?.length)
                }, [runUpdateVisibility, data?.length])

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
