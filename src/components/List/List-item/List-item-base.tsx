import React, {cloneElement, forwardRef, useCallback, useEffect, useId, useMemo, useRef} from 'react'
import {PanResponder, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../../hooks'
import {EventName, State} from '../../Common'
import {Icon} from '../../Icon'
import {IconButton} from '../../Icon-button'
import {ListAfterAffordancePressOutOptions} from '../List-after-affordance'
import {ListType} from '../List.interface'
import {
    HandleListItemCloseOptions,
    HandleListItemConfirmOptions,
    HandleListItemStateEventChangeOptions,
    HandleListItemTrailingPressOutOptions,
    InitialListItemState,
    ListItemBaseProps,
    ListItemProps,
    RenderListItemTrailingOptions
} from './List-item.interface'
import {useListItemAnimated} from './use-list-item-animated'

export const processListItemPropsEqual = (prevProps: ListItemProps) => (nextProps: ListItemProps) => {
    const {
        activeKey: prevActiveKey,
        activeKeys: prevActiveKeys,
        afterAffordanceActiveKey: prevAfterAffordanceActiveKey,
        extraData: prevExtraData,
        itemKey: prevItemKey
    } = prevProps

    const {
        activeKey: nextActiveKey,
        activeKeys: nextActiveKeys,
        afterAffordanceActiveKey: nextAfterAffordanceActiveKey,
        extraData: nextExtraData,
        itemKey: nextItemKey
    } = nextProps

    const activeKeyChange =
        prevActiveKey !== nextActiveKey && (nextActiveKey === nextItemKey || prevActiveKey === prevItemKey)

    const nextActive = nextActiveKeys?.includes(nextItemKey)
    const prevActive = prevActiveKeys?.includes(prevItemKey)
    const activeKeysChange =
        nextActiveKeys?.join() !== prevActiveKeys?.join() &&
        ((nextActive && !prevActive) || (prevActive && !nextActive))

    const afterAffordanceActiveChange =
        prevAfterAffordanceActiveKey !== nextAfterAffordanceActiveKey &&
        (nextAfterAffordanceActiveKey === nextItemKey || prevAfterAffordanceActiveKey === prevItemKey)

    return ![
        activeKeyChange,
        activeKeysChange,
        afterAffordanceActiveChange,
        prevExtraData?.join() !== nextExtraData?.join()
    ].some(Boolean)
}

const handleListItemPressOut = (type?: ListType) => (onActive?: (value?: string) => void) => (value: string) =>
    type !== 'standard' && onActive?.(value)

const handleListItemLoadEnd = (onLoadEnd?: (value?: string) => void) => (value?: string) => onLoadEnd?.(value)
const handleListItemStateChange =
    ({eventName, itemKey, onActive, type, onLoadEnd, state, trailingTrigger}: HandleListItemStateEventChangeOptions) =>
    (setState: Updater<InitialListItemState>) =>
    (_event: StateEvent) => {
        const nextEvent = {
            layout: () => handleListItemLoadEnd?.(onLoadEnd)(itemKey),
            pressOut: () => handleListItemPressOut(type)(onActive)(itemKey)
        } as Record<EventName, () => void>

        setState(draft => {
            const prevEventName = draft.eventName

            eventName && (draft.eventName = eventName)
            state && (draft.listItemState = state)

            if (trailingTrigger && state) {
                const visible =
                    trailingTrigger === 'hovered' ?
                        ['hovered', 'longPressIn', 'pressIn'].includes(state)
                    :   trailingTrigger === state

                draft.trailingVisible = visible
            }

            if (prevEventName !== eventName) {
                eventName === 'layout' && (draft.nextLayoutEvent = nextEvent[eventName])
                eventName === 'pressOut' && (draft.nextPressOutEvent = nextEvent[eventName])
            }
        })
    }

const handleListItemTrailingPressOut =
    ({
        afterAffordance,
        closeTrailing,
        onActiveAfterAffordance,
        onListItemClose
    }: HandleListItemTrailingPressOutOptions) =>
    (value: string) => {
        const nextEvent = {
            afterAffordance: () => onActiveAfterAffordance?.(value),
            closeTrailing: () => onListItemClose(true)
        }

        afterAffordance && nextEvent.afterAffordance()
        closeTrailing && nextEvent.closeTrailing()
    }

const handleItemListAfterAffordanceVisibleFinished = (setState: Updater<InitialListItemState>) => (value?: boolean) =>
    setState(draft => {
        draft.afterAffordanceClosed = !value
    })

const handleListItemConfirm =
    ({options, onConfirm, onActiveAfterAffordance, onListItemClose}: HandleListItemConfirmOptions) =>
    (value?: string) => {
        const {doubleConfirmed} = options

        if (doubleConfirmed) {
            onListItemClose(doubleConfirmed)

            return
        }

        onActiveAfterAffordance?.()
        onConfirm?.({...options, itemKey: value})
    }

const handleListItemClose =
    ({onClose, onVisible}: HandleListItemCloseOptions) =>
    (itemKey: string) =>
    (value?: boolean) => {
        if (!value) {
            return
        }

        onClose?.(itemKey)
        onVisible?.()
    }

const renderListItemTrailing = ({
    afterAffordance,
    onStateEvent,
    trailing,
    closeTrailing
}: RenderListItemTrailingOptions) => {
    const {onHoverIn, onHoverOut} = onStateEvent
    const standardTrailing = closeTrailing ? 'closeTrailing' : 'standard'
    const trailingType = afterAffordance ? 'afterAffordance' : standardTrailing
    const trailingElement = {
        afterAffordance:
            trailing ?
                cloneElement(trailing, onStateEvent)
            :   <IconButton
                    {...onStateEvent}
                    icon={
                        <Icon
                            iconStyle='outlined'
                            name='moreHoriz'
                            type='filled'
                        />
                    }
                    pointerEvents='box-only'
                    type='standard'
                />,
        closeTrailing:
            trailing ?
                cloneElement(trailing, onStateEvent)
            :   <IconButton
                    {...onStateEvent}
                    icon={
                        <Icon
                            iconStyle='outlined'
                            name='close'
                            type='filled'
                        />
                    }
                    pointerEvents='box-only'
                    type='standard'
                />,
        standard: trailing ? cloneElement(trailing, {onHoverIn, onHoverOut}) : undefined
    }

    return trailingElement[trailingType]
}

/**
 * FIXME: Fixes styles caused by multiple rows and design scaling
 */
export const ListItemBase = forwardRef<View, ListItemBaseProps>(
    (
        {
            activeKey,
            activeKeys,
            afterAffordance,
            afterAffordanceActiveKey,
            beforeAffordance,
            close,
            closeTrailing,
            enableUnderlay = true,
            enableUnderlayActive = true,
            itemKey,
            onActive,
            onActiveAfterAffordance,
            onClose,
            onConfirm,
            onLoadEnd,
            onVisible,
            render,
            supporting,
            trailing,
            trailingTrigger,
            type = 'standard',
            ...renderProps
        },
        ref
    ) => {
        const [
            {afterAffordanceClosed, eventName, listItemState, nextLayoutEvent, nextPressOutEvent, trailingVisible},
            setState
        ] = useImmer<InitialListItemState>({
            afterAffordanceClosed: undefined,
            eventName: undefined,
            listItemState: undefined,
            nextLayoutEvent: undefined,
            nextPressOutEvent: undefined,
            trailingVisible: undefined
        })

        const active = type === 'select' ? activeKey === itemKey : activeKeys?.includes(itemKey)
        const theme = useTheme()
        const activeColor = theme.token.scheme.secondaryContainer
        const underlayColor = active ? theme.token.scheme.onSecondaryContainer : theme.token.scheme.onSurface
        const afterAffordanceVisible = afterAffordanceActiveKey === itemKey
        const id = useId()
        const panResponder = useRef(
            PanResponder.create({
                onMoveShouldSetPanResponder: (_evt, gestureState) =>
                    Math.abs(gestureState.dx) > Math.abs(gestureState.dy),

                onPanResponderGrant: (_evt, _gestureState) => {},
                onPanResponderMove: (_evt, _gestureState) => {},
                onPanResponderRelease: (_evt, gestureState) => {
                    gestureState.dx < -50 && onActiveAfterAffordance?.(itemKey)
                    gestureState.dx > 50 && onActiveAfterAffordance?.()
                }
            })
        ).current

        const onListItemConfirm = ({itemKey: value, ...options}: ListAfterAffordancePressOutOptions) =>
            handleListItemConfirm({options, onActiveAfterAffordance, onListItemClose, onConfirm})(value)

        const onListItemClose = useMemo(
            () => handleListItemClose({onClose, onVisible})(itemKey),
            [itemKey, onClose, onVisible]
        )

        const onListItemTrailingPressOut = useCallback(
            () =>
                handleListItemTrailingPressOut({
                    afterAffordance,
                    closeTrailing,
                    onActiveAfterAffordance,
                    onListItemClose
                })(itemKey),
            [afterAffordance, closeTrailing, itemKey, onActiveAfterAffordance, onListItemClose]
        )

        const onListItemAfterAffordanceVisibleFinished = useMemo(
            () => handleItemListAfterAffordanceVisibleFinished(setState),
            [setState]
        )

        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleListItemStateChange({...options, itemKey, onActive, state, type, onLoadEnd, trailingTrigger})(
                setState
            )(event)

        const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})
        const contentAnimatedStyle = useListItemAnimated({
            afterAffordanceVisible,
            onListItemAfterAffordanceVisibleFinished
        })

        const trailingElement = useMemo(
            () =>
                renderListItemTrailing({
                    afterAffordance,
                    closeTrailing,
                    onStateEvent: {onPressOut: onListItemTrailingPressOut},
                    theme,
                    trailing
                }),
            [afterAffordance, closeTrailing, onListItemTrailingPressOut, theme, trailing]
        )

        useEffect(() => {
            nextPressOutEvent?.()
        }, [nextPressOutEvent])

        useEffect(() => {
            nextLayoutEvent?.()
        }, [nextLayoutEvent])

        useEffect(() => {
            onListItemClose(close)
        }, [close, onListItemClose])

        return render({
            ...renderProps,
            active,
            activeColor,
            afterAffordance,
            afterAffordanceVisible: !afterAffordanceClosed,
            beforeAffordance,
            contentAnimatedStyle,
            enableUnderlay,
            enableUnderlayActive,
            eventName,
            id,
            itemKey,
            onConfirm: onListItemConfirm,
            onStateEvent,
            panResponder: [afterAffordance, beforeAffordance].some(Boolean) ? panResponder : undefined,
            ref,
            state: listItemState,
            supporting,
            trailingElement,
            trailingTrigger,
            trailingVisible,
            type,
            underlayColor
        })
    }
)
