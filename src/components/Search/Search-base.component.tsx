import {COMPONENT_STATUS, type State, STATE} from '@/constants'
import {
        type HandleStateEventChangeOptions,
        type StateEvent,
        useClearComponentEvent,
        useInteractionStateEvent
} from '@/hooks'
import {debounce} from '@/utils'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput} from 'react-native'
import {useImmer} from 'use-immer'
import {
        handleSearchInputStateChange,
        handleSearchListActiveKey,
        handleSearchListFocusKey,
        updateSearchInputValue,
        updateSearchListData,
        updateSearchListExpanded,
        updateSearchListVisibility,
        updateSearchText
} from './Search.handler'
import type {SearchBaseProps, SearchState} from './Search.interface'
import {RenderSearch} from './Search.render'
import {useSearchAnimated} from './use-search-animated.hook'

export const SearchBase = forwardRef<TextInput, SearchBaseProps>(
        (
                {
                        data: rawData,
                        defaultValue,
                        disabled,
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
                                elevation,
                                eventName,
                                filterValue,
                                listExpanded: isListExpanded,
                                listVisible: isListVisible,
                                nextActiveEvent,
                                nextChangeTextEvent,
                                nextListVisibleEvent,
                                status,
                                value
                        },
                        setState
                ] = useImmer<SearchState>({
                        elevation: 0,
                        state: STATE.ENABLED,
                        status: COMPONENT_STATUS.IDLE,
                        value: ''
                })

                useClearComponentEvent(setState)

                const id = useId()
                const inputRef = useRef<TextInput>(null)
                const onChangeText = useMemo(
                        () => updateSearchText(rawOnChangeText)(setState),
                        [rawOnChangeText, setState]
                )

                const onListActiveKey = useMemo(
                        () => handleSearchListActiveKey({onActive: rawOnActive, ref: inputRef})(setState),
                        [rawOnActive, setState]
                )

                const onListFocusKey = useMemo(() => handleSearchListFocusKey(setState), [setState])
                const onUpdateListExpanded = useMemo(() => updateSearchListExpanded(setState), [setState])

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

                const runUpdateValue = useMemo(() => updateSearchInputValue(setState), [setState])
                const runUpdateVisibility = useMemo(
                        () => debounce(updateSearchListVisibility(setState))(150),
                        [setState]
                )

                const runUpdateSearchListData = useMemo(
                        () => updateSearchListData({data: rawData, filter})(setState),
                        [filter, rawData, setState]
                )

                const {contentAnimatedStyle, inputAnimatedStyle} = useSearchAnimated({
                        disabled,
                        listExpanded: isListExpanded
                })

                useImperativeHandle(ref, () => (inputRef?.current ?? {}) as TextInput, [inputRef])

                useEffect(() => {
                        runUpdateSearchListData(filterValue)
                }, [filterValue, runUpdateSearchListData])

                useEffect(() => {
                        runUpdateValue(rawValue ?? defaultValue)
                }, [runUpdateValue, defaultValue, rawValue])

                useEffect(() => {
                        runUpdateVisibility(!!value)
                }, [runUpdateVisibility, value])

                useEffect(() => {
                        nextActiveEvent?.()
                }, [nextActiveEvent])

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
                                activeKey={activeKey}
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
                                onActive={onListActiveKey}
                                onAnimationFinished={onUpdateListExpanded}
                                onChangeText={onChangeText}
                                onFocusKey={onListFocusKey}
                                ref={inputRef}
                                textInputPicker={!!rawData}
                                trailingElement={trailing}
                                value={value}
                        />
                )
        }
)

SearchBase.displayName = 'SearchBase'
