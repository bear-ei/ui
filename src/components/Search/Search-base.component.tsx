import {WritableDraft} from 'immer'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {TextInput, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce, textSearch} from '../../utils'
import {EventName, State} from '../Common'
import {ListData} from '../List'
import {SearchListProps} from './Search-list'
import {
        HandleSearchChangeTextOptions,
        HandleSearchStateChangeOptions,
        SearchBaseProps,
        SearchState
} from './Search.interface'

const handleSearchStateChange =
        ({eventName, ref, state}: HandleSearchStateChangeOptions) =>
        (setState: Updater<SearchState>) =>
        (_event: StateEvent) => {
                const handleTextFieldFocus = () => ref?.current?.focus()
                const nextEvent = {
                        pressOut: () => handleTextFieldFocus()
                } as Record<EventName, () => void>

                if (eventName === 'layout') {
                        return
                }

                setState(draft => {
                        if (draft.state === 'focused' && eventName !== 'blur') {
                                return
                        }

                        const prevEventName = draft.eventName

                        if (eventName) {
                                draft.eventName = eventName
                        }

                        if (state) {
                                draft.state = state
                        }

                        if (prevEventName !== eventName && eventName === 'pressOut') {
                                draft.nextPressOutEvent = nextEvent[eventName]
                        }
                })
        }

const handleSearchChangeText =
        ({data = [], onChangeText}: HandleSearchChangeTextOptions = {}) =>
        (setState: Updater<SearchState>) =>
        (value?: string) => {
                const handleNextChangeTextEvent = () => {
                        if (value) {
                                onChangeText?.(value)
                        }
                }

                const matchedData = value ? textSearch(data)(['headline', 'supporting'])(value) : []

                setState(draft => {
                        const prevSearchValue = draft.searchValue

                        draft.data = (matchedData.length ? matchedData : undefined) as WritableDraft<ListData>[]
                        draft.searchValue = value

                        if (typeof value === 'string' && value !== prevSearchValue) {
                                draft.nextChangeTextEvent = handleNextChangeTextEvent
                        }
                })
        }

const handleSearchListVisible = (setState: Updater<SearchState>) => (value?: boolean) => {
        if (typeof value === 'boolean') {
                setState(draft => {
                        draft.listVisible = value
                })
        }
}

const setSearchLayout = (setState: Updater<SearchState>) => (containerCurrent?: View | null) =>
        containerCurrent?.measure((x, y, width, height, pageX, pageY) =>
                setState(draft => {
                        draft.layout.height = height
                        draft.layout.pageX = pageX
                        draft.layout.pageY = pageY
                        draft.layout.width = width
                        draft.layout.x = x
                        draft.layout.y = y
                })
        )

const handleSearchContainerLayout =
        (setState: Updater<SearchState>) => (containerCurrent?: View | null) => (listVisible?: boolean) => {
                if (listVisible) {
                        setSearchLayout(setState)(containerCurrent)
                }
        }

/**
 * TODO:
 * - [macOS] Add support for trailingEvent
 *
 * Later handleing may deal with the trailingEvent to move into the event
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
                        value,
                        ...renderProps
                },
                ref
        ) => {
                const [
                        {searchValue, eventName, layout, listVisible, nextPressOutEvent, nextChangeTextEvent},
                        setState
                ] = useImmer<SearchState>({
                        eventName: undefined,
                        layout: {} as SearchState['layout'],
                        listVisible: undefined,
                        nextChangeTextEvent: undefined,
                        nextPressOutEvent: undefined,
                        searchValue: undefined,
                        state: 'enabled'
                })

                const containerRef = useRef<View>(null)
                const id = useId()
                const inputRef = useRef<TextInput>(null)
                const theme = useTheme()
                const placeholderTextColor = theme.token.scheme.onSurfaceVariant
                const underlayColor = theme.token.scheme.onSurface
                const {data} = listProps
                const onSearchListVisible = useMemo(() => debounce(handleSearchListVisible(setState))(150), [setState])
                const onSearchChangeText = handleSearchChangeText({data, onChangeText})(setState)
                const onSearchChangeTextSource = useMemo(() => handleSearchChangeText()(setState), [setState])
                const onSearchContainerLayout = useMemo(
                        () => handleSearchContainerLayout(setState)(containerRef.current),
                        [setState]
                )

                const onStateEventChange = useCallback(
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleSearchStateChange({...options, ref: inputRef, state})(setState)(event),
                        [setState]
                )

                const onStateEvent = useOnStateEvent({
                        ...renderProps,
                        onStateEventChange
                })

                useImperativeHandle(ref, () => (inputRef?.current ? inputRef?.current : {}) as TextInput, [])

                useEffect(() => {
                        onSearchChangeTextSource(value ?? defaultValue)
                }, [defaultValue, onSearchChangeTextSource, value])

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
                        placeholderTextColor,
                        ref: inputRef,
                        underlayColor,
                        value: searchValue
                })
        }
)
