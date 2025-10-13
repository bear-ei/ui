import {COMPONENT_STATUS, State, STATE} from '@/constants'
import {HandleStateEventChangeOptions, StateEvent, useClearComponentEvent, useInteractionStateEvent} from '@/hooks'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput, View} from 'react-native'
import {useImmer} from 'use-immer'
import {
        createSearchLayoutMeasureHandler,
        handleSearchInputStateChange,
        updateSearchInputValue,
        updateSearchListVisibility,
        updateSearchTextWithMatch
} from './Search.handler'
import type {SearchBaseProps, SearchState} from './Search.interface'
import {RenderSearch} from './Search.render'
import {useSearchAnimated} from './use-search-animated.hook'

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
                        disabled,
                        leading,
                        listProps,
                        onChangeText: rawOnChangeText,
                        trailing,
                        value: rawValue,
                        ...renderSearchProps
                },
                ref
        ) => {
                const [{eventName, layout, listVisible: isListVisible, nextChangeTextEvent, status, value}, setState] =
                        useImmer<SearchState>({
                                layout: {} as SearchState['layout'],
                                state: STATE.ENABLED,
                                status: COMPONENT_STATUS.IDLE,
                                value: ''
                        })

                useClearComponentEvent(setState)

                const {data} = useMemo(() => listProps ?? {}, [listProps])
                const containerRef = useRef<View>(null)
                const id = useId()
                const inputRef = useRef<TextInput>(null)
                const onChangeText = useMemo(
                        () => updateSearchTextWithMatch({data, onChangeText: rawOnChangeText})(setState),
                        [data, rawOnChangeText, setState]
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

                const runUpdateVisibility = useMemo(() => updateSearchListVisibility(setState), [setState])
                const runUpdateValue = useMemo(() => updateSearchInputValue(data)(setState), [data, setState])
                const runLayoutMeasureHandler = useMemo(
                        () => createSearchLayoutMeasureHandler(containerRef.current)(setState),
                        [setState]
                )

                const {contentAnimatedStyle, inputAnimatedStyle} = useSearchAnimated({disabled})

                useImperativeHandle(ref, () => (inputRef?.current ?? {}) as TextInput, [inputRef])

                useEffect(() => {
                        runUpdateValue(rawValue ?? defaultValue)
                }, [runUpdateValue, defaultValue, rawValue])

                useEffect(() => {
                        if (!data) {
                                return
                        }

                        runUpdateVisibility(!data?.length)
                }, [runUpdateVisibility, data])

                useEffect(() => {
                        runLayoutMeasureHandler(isListVisible)
                }, [runLayoutMeasureHandler, isListVisible])

                useEffect(() => {
                        nextChangeTextEvent?.()
                }, [nextChangeTextEvent])

                if (status === COMPONENT_STATUS.IDLE) {
                        return
                }

                return (
                        <RenderSearch
                                {...renderSearchProps}
                                containerRef={containerRef}
                                contentAnimatedStyle={contentAnimatedStyle}
                                disabled={disabled}
                                eventName={eventName}
                                id={id}
                                inputAnimatedStyle={inputAnimatedStyle}
                                interactionHandlers={interactionHandlers}
                                layout={layout}
                                leadingElement={leading}
                                listProps={listProps}
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
