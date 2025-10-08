import {COMPONENT_STATUS, State} from '@/constants'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {useImmer} from 'use-immer'
import {
        useClearComponentEvent,
        useInteractionStateEvent,
        type HandleStateEventChangeOptions,
        type StateEvent
} from '../../../hooks'
import {debounce} from '../../../utils'
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
        updateListItemTrailingVisibility
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
                        selectType,
                        shape,
                        supporting,
                        trailing,
                        trailingProps: rawTrailingProps,
                        trailingTriggerEvent,
                        type = LIST_TYPE.STANDARD,
                        ...renderListItemProps
                },
                ref
        ) => {
                const [
                        {
                                afterAffordanceExpanded: isAfterAffordanceExpanded,
                                eventName,
                                nextLayoutEvent,
                                nextPressInEvent,
                                nextPressOutEvent,
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
                :       indexKey && activeKeys?.includes(indexKey))

                const {onPressOut: rawOnTrailingPressOut, ...trailingProps} = useMemo(
                        () => rawTrailingProps ?? {},
                        [rawTrailingProps]
                )

                const onClose = useMemo(() => maybeTriggerListItemClose(rawOnClose)(indexKey), [indexKey, rawOnClose])
                const onTrailingVisibility = useMemo(() => updateListItemTrailingVisibility(setState), [setState])
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
                        [
                                afterAffordance,
                                closeTrailing,
                                indexKey,
                                onActiveAfterAffordance,
                                onClose,
                                rawOnTrailingPressOut
                        ]
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

                const runActive = useMemo(
                        () => updateListItemActive(selectType)(rawOnActive),
                        [rawOnActive, selectType]
                )

                const runUpdateFocusState = useMemo(
                        () => updateListItemFocusState(itemIndex)(pressableRef),
                        [itemIndex]
                )

                const runUpdateAfterAffordanceVisibility = useMemo(
                        () => debounce(updateListItemAfterAffordanceExpanded(setState))(300),
                        [setState]
                )

                const runTrailingTriggerEvent = useMemo(
                        () => debounce(handleTrailingTriggerEvent(trailingTriggerEvent)(setState))(50),
                        [setState, trailingTriggerEvent]
                )

                const trailingElement = useMemo(
                        () =>
                                [closeTrailing, afterAffordance, trailing].some(Boolean) ?
                                        <RenderListItemTrailing
                                                afterAffordance={afterAffordance}
                                                closeTrailing={closeTrailing}
                                                disabled={disabled}
                                                id={id}
                                                interactionHandlers={{onPressOut: onTrailingPressOut}}
                                                onTrailingVisibility={onTrailingVisibility}
                                                trailing={trailing}
                                                trailingProps={trailingProps}
                                                trailingTriggerEvent={trailingTriggerEvent}
                                                type={type}
                                        />
                                :       undefined,
                        [
                                afterAffordance,
                                closeTrailing,
                                disabled,
                                id,
                                onTrailingPressOut,
                                onTrailingVisibility,
                                trailing,
                                trailingProps,
                                trailingTriggerEvent,
                                type
                        ]
                )

                useImperativeHandle(
                        ref,
                        () =>
                                ({
                                        ...(pressableRef?.current ?? {}),
                                        active: handleActive,
                                        close: onClose
                                }) as ListItemRef,
                        [handleActive, onClose]
                )

                useEffect(() => {
                        if (dragging) {
                                runActive(indexKey)
                        }
                }, [dragging, indexKey, runActive])

                useEffect(() => {
                        runUpdateAfterAffordanceVisibility(isAfterAffordanceVisible)
                }, [isAfterAffordanceVisible, runUpdateAfterAffordanceVisibility])

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
                        nextPressOutEvent?.()
                }, [nextPressOutEvent])

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
                                supporting={supporting}
                                trailingElement={trailingElement}
                                trailingTriggerEvent={trailingTriggerEvent}
                                trailingVisible={isTrailingVisible ?? !trailingTriggerEvent}
                                type={type}
                        />
                )
        }
)

ListItemBase.displayName = 'ListItemBase'
