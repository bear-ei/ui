import {cloneElement, forwardRef, useEffect, useId, useMemo, useRef} from 'react'
import {GestureResponderEvent, PanResponder, PanResponderGestureState, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../../hook'
import {EventName, State} from '../../Common'
import {Icon} from '../../Icon'
import {IconButton} from '../../Icon-button'
import {ListAfterAffordancePressOutOptions} from '../List-after-affordance'
import {ListType} from '../List.interface'
import {
    HandleListItemCloseOptions,
    HandleListItemConfirmOptions,
    HandleListItemPanResponderReleaseOptions,
    HandleListItemStateEventChangeOptions,
    HandleListItemTrailingPressOutOptions,
    ListItemBaseProps,
    ListItemProps,
    ListItemState,
    RenderListItemTrailingOptions
} from './List-item.interface'
import {useListItemAnimated} from './use-list-item-animated.hook'

export const handleListItemPropsEqual = (prevProps: ListItemProps) => {
    const {
        activeKey: prevActiveKey,
        activeKeys: prevActiveKeys,
        afterAffordanceActiveKey: prevAfterAffordanceActiveKey,
        disabled: prevDisabled,
        extraData: prevExtraData,
        itemKey: prevItemKey
    } = prevProps

    return (nextProps: ListItemProps) => {
        const {
            activeKey: nextActiveKey,
            activeKeys: nextActiveKeys,
            afterAffordanceActiveKey: nextAfterAffordanceActiveKey,
            disabled: nextDisabled,
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
            prevExtraData?.join() !== nextExtraData?.join(),
            prevDisabled !== nextDisabled
        ].some(Boolean)
    }
}

const handleListItemPressOut = (type?: ListType) => (onActive?: (value?: string) => void) => (value: string) => {
    if (type !== 'standard') {
        onActive?.(value)
    }
}

const handleListItemLoadEnd = (onLoadEnd?: (value?: string) => void) => (value?: string) => onLoadEnd?.(value)
const handleListItemStateChange = ({
    eventName,
    itemKey,
    onActive,
    type,
    onLoadEnd,
    state,
    trailingTrigger
}: HandleListItemStateEventChangeOptions) => {
    const nextEvent = {
        layout: () => handleListItemLoadEnd?.(onLoadEnd)(itemKey),
        pressOut: () => handleListItemPressOut(type)(onActive)(itemKey)
    } as Record<EventName, () => void>

    return (setState: Updater<ListItemState>) => (_event: StateEvent) =>
        setState(draft => {
            const prevEventName = draft.eventName

            if (eventName) {
                draft.eventName = eventName
            }

            if (state) {
                draft.listItemState = state
            }

            if (trailingTrigger && state) {
                const visible =
                    trailingTrigger === 'hovered' ?
                        ['hovered', 'longPressIn', 'pressIn'].includes(state)
                    :   trailingTrigger === state

                draft.trailingVisible = visible
            }

            if (prevEventName !== eventName) {
                if (eventName === 'layout') {
                    draft.nextLayoutEvent = nextEvent[eventName]
                }

                if (eventName === 'pressOut') {
                    draft.nextPressOutEvent = nextEvent[eventName]
                }
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

        if (afterAffordance) {
            nextEvent.afterAffordance()
        }

        if (closeTrailing) {
            nextEvent.closeTrailing()
        }
    }

const handleItemListAfterAffordanceVisibleFinished = (setState: Updater<ListItemState>) => (value?: boolean) =>
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

const handleListItemPanResponderRelease =
    ({onActiveAfterAffordance, disabled}: HandleListItemPanResponderReleaseOptions) =>
    (itemKey: string) =>
    (_evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (disabled) {
            return
        }

        if (gestureState.dx < -50) {
            onActiveAfterAffordance?.(itemKey)
        }

        if (gestureState.dx > 50) {
            onActiveAfterAffordance?.()
        }
    }

const renderListItemTrailing = ({
    afterAffordance,
    closeTrailing,
    disabled,
    onStateEvent,
    trailing
}: RenderListItemTrailingOptions) => {
    const {onHoverIn, onHoverOut} = onStateEvent
    const standardTrailing = closeTrailing ? 'closeTrailing' : 'standard'
    const trailingType = afterAffordance ? 'afterAffordance' : standardTrailing
    const trailingElement = {
        afterAffordance:
            trailing ?
                cloneElement(trailing, {...onStateEvent, disabled})
            :   <IconButton
                    {...onStateEvent}
                    icon={
                        <Icon
                            iconStyle='outlined'
                            name='moreHoriz'
                            type='filled'
                        />
                    }
                    disabled={disabled}
                    pointerEvents='box-only'
                    type='standard'
                />,
        closeTrailing:
            trailing ?
                cloneElement(trailing, {...onStateEvent, disabled})
            :   <IconButton
                    {...onStateEvent}
                    icon={
                        <Icon
                            iconStyle='outlined'
                            name='close'
                            type='filled'
                        />
                    }
                    disabled={disabled}
                    pointerEvents='box-only'
                    type='standard'
                />,
        standard: trailing ? cloneElement(trailing, {onHoverIn, onHoverOut, disabled}) : undefined
    }

    return trailingElement[trailingType]
}

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
            disabled,
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
        ] = useImmer<ListItemState>({
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
        const afterAffordanceVisible = afterAffordanceActiveKey === itemKey
        const id = useId()
        const underlayColor = active ? theme.token.scheme.onSecondaryContainer : theme.token.scheme.onSurface
        const onListItemPanResponderRelease = handleListItemPanResponderRelease({onActiveAfterAffordance, disabled})(
            itemKey
        )

        const panResponder = useRef(
            PanResponder.create({
                onMoveShouldSetPanResponder: (_evt, gestureState) =>
                    Math.abs(gestureState.dx) > Math.abs(gestureState.dy),

                onPanResponderGrant: (_evt, _gestureState) => {},
                onPanResponderMove: (_evt, _gestureState) => {},
                onPanResponderRelease: onListItemPanResponderRelease
            })
        ).current

        const onListItemConfirm = ({itemKey: value, ...options}: ListAfterAffordancePressOutOptions) =>
            handleListItemConfirm({options, onActiveAfterAffordance, onListItemClose, onConfirm})(value)

        const onListItemClose = handleListItemClose({onClose, onVisible})(itemKey)
        const onListItemTrailingPressOut = () =>
            handleListItemTrailingPressOut({afterAffordance, closeTrailing, onActiveAfterAffordance, onListItemClose})(
                itemKey
            )

        const onListItemAfterAffordanceVisibleFinished = useMemo(
            () => handleItemListAfterAffordanceVisibleFinished(setState),
            [setState]
        )

        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleListItemStateChange({...options, itemKey, onActive, state, type, onLoadEnd, trailingTrigger})(
                setState
            )(event)

        const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange, disabled})
        const {contentAnimatedStyle} = useListItemAnimated({
            afterAffordanceVisible,
            onListItemAfterAffordanceVisibleFinished
        })

        const trailingElement = renderListItemTrailing({
            afterAffordance,
            closeTrailing,
            disabled,
            onStateEvent: {onPressOut: onListItemTrailingPressOut},
            theme,
            trailing
        })

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
            disabled,
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
