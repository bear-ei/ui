import {COMPONENT_STATUS, type State} from '@/constants'
import {
    type HandleStateEventChangeOptions,
    type StateEvent,
    useClearComponentEvent,
    useInteractionStateEvent
} from '@/hooks'
import {debounce} from '@/utils'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {useImmer} from 'use-immer'
import {LIST_SELECT_TYPE, LIST_TYPE} from '../List.enum'
import {
    confirmListItemAffordanceAction,
    handleListItemStateChange,
    handleTrailingTriggerEvent,
    maybeTriggerListItemClose,
    triggerListItemTrailingActions,
    updateListItemActive,
    updateListItemAfterAffordanceExpanded,
    updateListItemFocusState,
    updateListItemTrailingVisible
} from './List-item.handler'
import type {ListItemBaseProps, ListItemRef, ListItemState} from './List-item.interface'
import {RenderListItem, RenderListItemTrailing} from './List-item.render'
import {useListItemAnimated} from './use-list-item-animated.hook'

export const ListItemBase = forwardRef<ListItemRef, ListItemBaseProps>(
    (
        {
            activeKey,
            activeKeys,
            afterAffordance,
            afterAffordanceActiveKey,
            closeTrailing,
            disabled,
            dragging,
            enableUnderlay = true,
            enableUnderlayActive = true,
            focusedIndex,
            indexKey,
            itemIndex,
            leading,
            onActive: rawOnActive,
            onActiveAfterAffordance,
            onClose: rawOnClose,
            onConfirm: rawOnConfirm,
            onLoadEnd,
            onTrailingPressOut: rawOnTrailingPressOut,
            selectType,
            shape,
            size,
            supporting,
            trailing,
            trailingTriggerOn,
            type = LIST_TYPE.STANDARD,
            ...renderListItemProps
        },
        ref
    ) => {
        const [
            {
                afterAffordanceExpanded: isAfterAffordanceExpanded,
                eventName,
                nextActiveEvent,
                nextLayoutEvent,
                nextPressInEvent,
                status,
                trailingVisible: isTrailingVisible
            },
            setState
        ] = useImmer<ListItemState>({status: COMPONENT_STATUS.IDLE})

        useClearComponentEvent(setState)

        const id = useId()
        const pressableRef = useRef<ListItemRef>(null)
        const isAfterAffordanceVisible = indexKey ? afterAffordanceActiveKey === indexKey : undefined
        const isActive = !!(selectType === LIST_SELECT_TYPE.SINGLE ?
            activeKey === indexKey
        :   indexKey && activeKeys?.includes(indexKey))

        const onClose = useMemo(() => maybeTriggerListItemClose(rawOnClose)(indexKey), [indexKey, rawOnClose])
        const onTrailingVisible = useMemo(() => updateListItemTrailingVisible(setState), [setState])
        const onConfirm = useMemo(
            () =>
                confirmListItemAffordanceAction({
                    onActiveAfterAffordance,
                    onClose,
                    onConfirm: rawOnConfirm
                }),
            [onActiveAfterAffordance, onClose, rawOnConfirm]
        )

        const onTrailingPressOut = useMemo(
            () =>
                triggerListItemTrailingActions({
                    afterAffordance,
                    closeTrailing,
                    onActiveAfterAffordance,
                    onClose,
                    onPressOut: rawOnTrailingPressOut
                })(indexKey),
            [afterAffordance, closeTrailing, indexKey, onActiveAfterAffordance, onClose, rawOnTrailingPressOut]
        )

        const onActive = useMemo(() => updateListItemActive(selectType)(rawOnActive), [rawOnActive, selectType])
        const onStateEventChange = useCallback(
            (options: HandleStateEventChangeOptions) => (_state: State) => (event: StateEvent) =>
                handleListItemStateChange({
                    ...options,
                    indexKey,
                    itemIndex,
                    onActive,
                    onLoadEnd,
                    type
                })(setState)(event),
            [indexKey, itemIndex, onActive, onLoadEnd, setState, type]
        )

        const handleActive = useCallback(() => onActive?.(indexKey), [indexKey, onActive])
        const interactionHandlers = useInteractionStateEvent({
            ...renderListItemProps,
            disabled,
            onStateEventChange
        })

        const {contentAnimatedStyle, headlineTextAnimatedStyle} = useListItemAnimated({
            active: isActive,
            afterAffordanceVisible: isAfterAffordanceVisible,
            status
        })

        const runActive = onActive
        const runUpdateFocusState = useMemo(() => updateListItemFocusState(setState)(itemIndex), [itemIndex, setState])

        const runUpdateAfterAffordanceVisible = useMemo(
            () => debounce(updateListItemAfterAffordanceExpanded(setState))(300),
            [setState]
        )

        const runTrailingTriggerEvent = useMemo(
            () => debounce(handleTrailingTriggerEvent(trailingTriggerOn)(setState))(50),
            [setState, trailingTriggerOn]
        )

        const trailingElement =
            [closeTrailing, afterAffordance, trailing].some(Boolean) ?
                <RenderListItemTrailing
                    afterAffordance={afterAffordance}
                    closeTrailing={closeTrailing}
                    disabled={disabled}
                    id={id}
                    interactionHandlers={{onPressOut: onTrailingPressOut}}
                    onTrailingVisible={onTrailingVisible}
                    size={size}
                    trailing={trailing}
                    trailingTriggerOn={trailingTriggerOn}
                />
            :   undefined

        useImperativeHandle(
            ref,
            () => ({...(pressableRef?.current ?? {}), active: handleActive, close: onClose}) as ListItemRef,
            [handleActive, onClose]
        )

        useEffect(() => {
            if (dragging) {
                runActive(indexKey)
            }
        }, [dragging, indexKey, runActive])

        useEffect(() => {
            runUpdateAfterAffordanceVisible(isAfterAffordanceVisible)
        }, [isAfterAffordanceVisible, runUpdateAfterAffordanceVisible])

        useEffect(() => {
            runTrailingTriggerEvent(eventName)
        }, [eventName, runTrailingTriggerEvent])

        useEffect(() => {
            runUpdateFocusState(focusedIndex)
        }, [runUpdateFocusState, focusedIndex])

        useEffect(() => {
            nextPressInEvent?.()
        }, [nextPressInEvent])

        useEffect(() => {
            nextActiveEvent?.()
        }, [nextActiveEvent])

        useEffect(() => {
            nextLayoutEvent?.()
        }, [nextLayoutEvent])

        return (
            <RenderListItem
                {...renderListItemProps}
                active={isActive}
                afterAffordance={afterAffordance}
                afterAffordanceExpanded={isAfterAffordanceExpanded}
                afterAffordanceVisible={isAfterAffordanceVisible}
                closeTrailing={closeTrailing}
                contentAnimatedStyle={contentAnimatedStyle}
                disabled={disabled}
                enableUnderlay={enableUnderlay}
                enableUnderlayActive={enableUnderlayActive}
                eventName={eventName}
                headlineTextAnimatedStyle={headlineTextAnimatedStyle}
                id={id}
                indexKey={indexKey}
                interactionHandlers={interactionHandlers}
                leadingElement={leading}
                onConfirm={onConfirm}
                ref={pressableRef}
                selectType={selectType}
                shape={shape}
                size={size}
                supporting={supporting}
                trailingElement={trailingElement}
                trailingTriggerOn={trailingTriggerOn}
                trailingVisible={isTrailingVisible ?? !trailingTriggerOn}
                type={type}
            />
        )
    }
)

ListItemBase.displayName = 'ListItemBase'
