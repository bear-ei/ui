import {WritableDraft} from 'immer'
import {RefObject, forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {TextInput, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hook'
import {debounce, textSearch} from '../../util'
import {EventName, State} from '../Common'
import {ListData} from '../List'
import {SearchListProps} from './Search-list'
import {
    InitialSearchState,
    ProcessSearchChangeTextOptions,
    ProcessSearchStateChangeOptions,
    SearchBaseProps
} from './Search.interface'

const handleSearchFocus = (ref?: RefObject<TextInput>) => ref?.current?.focus()
const handleSearchStateChange =
    ({eventName, ref, state}: ProcessSearchStateChangeOptions) =>
    (setState: Updater<InitialSearchState>) =>
    (_event: StateEvent) => {
        if (eventName === 'layout') {
            return
        }

        const nextEvent = {
            pressOut: () => handleSearchFocus(ref)
        } as Record<EventName, () => void>

        setState(draft => {
            if (draft.state === 'focused' && eventName !== 'blur') {
                return
            }

            const prevEventName = draft.eventName

            eventName && (draft.eventName = eventName)
            state && (draft.state = state)
            prevEventName !== eventName && eventName === 'pressOut' && (draft.nextPressOutEvent = nextEvent[eventName])
        })
    }

const createNextChangeTextCallback = (onChangeText?: (value: string) => void) => (value: string) => () =>
    onChangeText?.(value)

const handleSearchChangeText =
    ({data = [], onChangeText}: ProcessSearchChangeTextOptions = {}) =>
    (setState: Updater<InitialSearchState>) =>
    (value?: string) => {
        const matchedData = value ? textSearch(data)(['headline', 'supporting'])(value) : []

        setState(draft => {
            const prevSearchValue = draft.searchValue

            draft.data = (matchedData.length ? matchedData : undefined) as WritableDraft<ListData>[]
            draft.searchValue = value
            typeof value === 'string' &&
                value !== prevSearchValue &&
                (draft.nextChangeTextCallback = createNextChangeTextCallback(onChangeText)(value))
        })
    }

const handleSearchListVisible = (setState: Updater<InitialSearchState>) => (value?: boolean) =>
    typeof value === 'boolean' &&
    setState(draft => {
        draft.listVisible = value
    })

const setSearchLayout = (setState: Updater<InitialSearchState>) => (containerCurrent?: View | null) =>
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
    (setState: Updater<InitialSearchState>) => (containerCurrent?: View | null) => (listVisible?: boolean) =>
        listVisible && setSearchLayout(setState)(containerCurrent)

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
        const [{searchValue, eventName, layout, listVisible, nextPressOutEvent, nextChangeTextCallback}, setState] =
            useImmer<InitialSearchState>({
                eventName: undefined,
                layout: {} as InitialSearchState['layout'],
                listVisible: undefined,
                nextChangeTextCallback: undefined,
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
        const onDebounceSearchListVisible = useMemo(() => debounce(handleSearchListVisible(setState))(150), [setState])
        const onSearchChangeText = handleSearchChangeText({data, onChangeText})(setState)
        const onSearchChangeTextSource = useMemo(() => handleSearchChangeText()(setState), [setState])
        const onSearchContainerLayout = useMemo(
            () => handleSearchContainerLayout(setState)(containerRef.current),
            [setState]
        )

        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleSearchStateChange({...options, ref: inputRef, state})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})

        useImperativeHandle(ref, () => (inputRef?.current ? inputRef?.current : {}) as TextInput, [])

        useEffect(() => {
            onSearchChangeTextSource(value ?? defaultValue)
        }, [defaultValue, onSearchChangeTextSource, value])

        useEffect(() => {
            data && onDebounceSearchListVisible(!data?.length)
        }, [data, onDebounceSearchListVisible])

        useEffect(() => {
            onSearchContainerLayout(listVisible)
        }, [listVisible, onSearchContainerLayout])

        useEffect(() => {
            nextPressOutEvent?.()
        }, [nextPressOutEvent])

        useEffect(() => {
            nextChangeTextCallback?.()
        }, [nextChangeTextCallback])

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
