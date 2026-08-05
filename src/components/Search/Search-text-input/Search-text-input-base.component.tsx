import {COMPONENT_STATUS, STATE, type State} from '@/constants'
import {
    useClearComponentEvent,
    useInteractionStateEvent,
    type HandleStateEventChangeOptions,
    type StateEvent
} from '@/hooks'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput} from 'react-native'
import {useImmer} from 'use-immer'
import {
    handleSearchTextInputStateChange,
    updateSearchTextInputText,
    updateSearchTextInputValue
} from './Search-text-input.handler'
import type {SearchTextInputBaseProps, SearchTextInputState} from './Search-text-input.interface'
import {RenderSearchTextInput} from './Search-text-input.render'
import {useSearchTextInputAnimated} from './use-search-text-input-animated.hook'

export const SearchTextInputBase = forwardRef<TextInput, SearchTextInputBaseProps>(
    (
        {
            defaultValue,
            disabled,
            expanded: isExpanded,
            leading,
            onChangeText: rawOnChangeText,
            trailing,
            value: rawValue,
            ...renderSearchProps
        },
        ref
    ) => {
        const [{eventName, nextChangeTextEvent, status, value}, setState] = useImmer<SearchTextInputState>({
            state: STATE.ENABLED,
            status: COMPONENT_STATUS.IDLE,
            value: ''
        })

        useClearComponentEvent(setState)

        const id = useId()
        const inputRef = useRef<TextInput>(null)
        const onChangeText = useMemo(
            () => updateSearchTextInputText(rawOnChangeText)(setState),
            [rawOnChangeText, setState]
        )

        const onStateEventChange = useCallback(
            (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                handleSearchTextInputStateChange({...options, ref: inputRef, state})(setState)(event),
            [setState]
        )

        const interactionHandlers = useInteractionStateEvent({...renderSearchProps, disabled, onStateEventChange})
        const runUpdateValue = useMemo(() => updateSearchTextInputValue(setState), [setState])
        const {contentAnimatedStyle, inputAnimatedStyle} = useSearchTextInputAnimated({
            disabled,
            expanded: isExpanded
        })

        useImperativeHandle(ref, () => (inputRef?.current ?? {}) as TextInput, [inputRef])

        useEffect(() => {
            runUpdateValue(rawValue ?? defaultValue)
        }, [runUpdateValue, defaultValue, rawValue])

        useEffect(() => {
            nextChangeTextEvent?.()
        }, [nextChangeTextEvent])

        if (status === COMPONENT_STATUS.IDLE) {
            return
        }

        return (
            <RenderSearchTextInput
                {...renderSearchProps}
                contentAnimatedStyle={contentAnimatedStyle}
                disabled={disabled}
                eventName={eventName}
                id={id}
                inputAnimatedStyle={inputAnimatedStyle}
                interactionHandlers={interactionHandlers}
                leadingElement={leading}
                onChangeText={onChangeText}
                ref={inputRef}
                trailingElement={trailing}
                value={value}
            />
        )
    }
)

SearchTextInputBase.displayName = 'SearchTextInputBase'
