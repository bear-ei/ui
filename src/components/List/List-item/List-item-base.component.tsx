import {cloneElement, forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {GestureResponderEvent, PanResponder, PanResponderGestureState, View, ViewProps} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../../hooks'
import {EventName, State} from '../../Common'
import {Icon} from '../../Icon'
import {IconButton, IconButtonType} from '../../Icon-button'
import {ListAfterAffordancePressOutOptions} from '../List-after-affordance'
import {
        HandleListItemCloseOptions,
        HandleListItemConfirmOptions,
        HandleListItemPanResponderReleaseOptions,
        HandleListItemStateEventChangeOptions,
        HandleListItemTrailingPressOutOptions,
        ListItemBaseProps,
        ListItemProps,
        ListItemState,
        RenderListItemTrailingOptions,
        SelectType
} from './List-item.interface'
import {useListItemAnimated} from './use-list-item-animated.hook'

export const handleListItemPropsEqual = (prevProps: ListItemProps) => {
        const {
                activeKey: prevActiveKey,
                activeKeys: prevActiveKeys,
                afterAffordanceActiveKey: prevAfterAffordanceActiveKey,
                disabled: prevDisabled,
                extraData: prevExtraData,
                focusedIndex: prevFocusedIndex,
                itemIndex: prevItemIndex,
                itemKey: prevItemKey,
                skeletonDuration: prevSkeletonMinDuration
        } = prevProps

        return (nextProps: ListItemProps) => {
                const {
                        activeKey: nextActiveKey,
                        activeKeys: nextActiveKeys,
                        afterAffordanceActiveKey: nextAfterAffordanceActiveKey,
                        disabled: nextDisabled,
                        extraData: nextExtraData,
                        focusedIndex: nextFocusedIndex,
                        itemIndex: nextItemIndex,
                        itemKey: nextItemKey,
                        skeletonDuration: nextSkeletonMinDuration
                } = nextProps

                const activeKeyChange =
                        prevActiveKey !== nextActiveKey &&
                        (nextActiveKey === nextItemKey || prevActiveKey === prevItemKey)

                const nextActive = nextActiveKeys?.includes(nextItemKey)
                const prevActive = prevActiveKeys?.includes(prevItemKey)
                const activeKeysChange =
                        nextActiveKeys?.join() !== prevActiveKeys?.join() &&
                        ((nextActive && !prevActive) || (prevActive && !nextActive))

                const afterAffordanceActiveChange =
                        prevAfterAffordanceActiveKey !== nextAfterAffordanceActiveKey &&
                        (nextAfterAffordanceActiveKey === nextItemKey || prevAfterAffordanceActiveKey === prevItemKey)

                const focusedIndexChange =
                        nextFocusedIndex !== prevFocusedIndex &&
                        (nextFocusedIndex === nextItemIndex || prevFocusedIndex === prevItemIndex)

                return ![
                        activeKeyChange,
                        activeKeysChange,
                        afterAffordanceActiveChange,
                        focusedIndexChange,
                        prevDisabled !== nextDisabled,
                        prevExtraData?.join() !== nextExtraData?.join(),
                        prevSkeletonMinDuration !== nextSkeletonMinDuration
                ].some(Boolean)
        }
}

const handleListItemPressOut =
        (selectType?: SelectType) => (onActive?: (value?: string) => void) => (value: string) => {
                if (selectType) {
                        onActive?.(value)
                }
        }

const handleListItemLoadEnd = (onLoadEnd?: (value?: string) => void) => (value?: string) => onLoadEnd?.(value)
const handleListItemStateChange =
        ({
                eventName,
                itemKey,
                onActive,
                onLoadEnd,
                selectType,
                state,
                trailingTrigger,
                type
        }: HandleListItemStateEventChangeOptions) =>
        (setState: Updater<ListItemState>) =>
        (_event: StateEvent) => {
                const nextEvent = {
                        layout: () => handleListItemLoadEnd?.(onLoadEnd)(itemKey),
                        pressOut: () => handleListItemPressOut(selectType)(onActive)(itemKey)
                } as Record<EventName, () => void>

                setState(draft => {
                        if (eventName === 'layout' && draft.status !== 'idle') {
                                return
                        }

                        const prevEventName = draft.eventName
                        const menuFocus =
                                eventName === 'blur' &&
                                prevEventName === 'focus' &&
                                type === 'menu' &&
                                ['hoverIn', 'hoverOut'].includes(eventName)

                        if (menuFocus) {
                                return
                        }

                        if (eventName) {
                                draft.eventName = eventName
                                draft.listItemState = state
                        }

                        if (trailingTrigger) {
                                const visible =
                                        trailingTrigger === 'hovered' ?
                                                state &&
                                                ['hovered', 'longPressIn', 'pressIn', 'focused'].includes(state)
                                        :       trailingTrigger === state

                                draft.trailingVisible = visible
                        }

                        switch (eventName) {
                                case 'layout':
                                        draft.nextLayoutEvent = nextEvent[eventName]
                                        draft.status = 'succeeded'
                                        break

                                case 'pressOut':
                                        draft.nextPressOutEvent = nextEvent[eventName]
                                        break

                                default:
                                        break
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

/**
 * When using the component Text-field-picker, you only need to change the focus style. Do not get the real focus.
 * Otherwise the Text-field-picker will lose focus.
 */
const handleListItemFocus = (setState: Updater<ListItemState>) => (itemIndex?: number) => (focusedIndex?: number) => {
        if (typeof focusedIndex === 'number') {
                setState(draft => {
                        draft.eventName = itemIndex === focusedIndex ? 'focus' : 'blur'
                })
        }
}

const handleListItemClose =
        ({onClose, onVisible}: HandleListItemCloseOptions) =>
        (itemKey: string) =>
        (value?: boolean) => {
                if (!value) {
                        return
                }

                onVisible?.(visible => {
                        if (!visible) {
                                onClose?.(itemKey)
                        }
                })
        }

const handleListItemPanResponderRelease =
        ({onActiveAfterAffordance, disabled}: HandleListItemPanResponderReleaseOptions) =>
        (itemKey: string) =>
        (_event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
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
        trailing,
        trailingProps
}: RenderListItemTrailingOptions) => {
        const {onHoverIn, onHoverOut} = onStateEvent
        const standardTrailing = closeTrailing ? 'closeTrailing' : 'standard'
        const trailingType = afterAffordance ? 'afterAffordance' : standardTrailing
        const props = {
                disabled,
                pointerEvents: 'box-only' as ViewProps['pointerEvents'],
                type: 'standard' as IconButtonType,
                ...onStateEvent,
                ...trailingProps
        }

        const trailingElement = {
                afterAffordance:
                        trailing ?
                                cloneElement(trailing, props)
                        :       <IconButton
                                        {...props}
                                        icon={
                                                <Icon
                                                        iconStyle='rounded'
                                                        name='moreHoriz'
                                                        type='filled'
                                                />
                                        }
                                />,
                closeTrailing:
                        trailing ?
                                cloneElement(trailing, props)
                        :       <IconButton
                                        {...props}
                                        icon={
                                                <Icon
                                                        iconStyle='rounded'
                                                        name='close'
                                                        type='filled'
                                                />
                                        }
                                />,
                standard: trailing ? cloneElement(trailing, {onHoverIn, onHoverOut, ...props}) : undefined
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
                        focusedIndex,
                        itemIndex,
                        itemKey,
                        leading,
                        onActive,
                        onActiveAfterAffordance,
                        onClose,
                        onConfirm,
                        onLoadEnd,
                        onVisible,
                        render,
                        selectType,
                        shape,
                        supporting,
                        trailing,
                        trailingProps,
                        trailingTrigger,
                        type = 'standard',
                        ...renderProps
                },
                ref
        ) => {
                const [
                        {
                                afterAffordanceClosed,
                                eventName,
                                listItemState,
                                nextFocusEvent,
                                nextLayoutEvent,
                                nextPressOutEvent,
                                trailingVisible
                        },
                        setState
                ] = useImmer<ListItemState>({
                        afterAffordanceClosed: undefined,
                        eventName: undefined,
                        listItemState: undefined,
                        nextFocusEvent: undefined,
                        nextLayoutEvent: undefined,
                        nextPressOutEvent: undefined,
                        status: 'idle',
                        trailingVisible: undefined
                })

                const touchableRef = useRef<View>(null)
                const active = selectType === 'select' ? activeKey === itemKey : activeKeys?.includes(itemKey)
                const theme = useTheme()
                const activeColor = theme.token.scheme.secondaryContainer
                const afterAffordanceVisible = afterAffordanceActiveKey === itemKey
                const id = useId()
                const underlayColor = active ? theme.token.scheme.onSecondaryContainer : theme.token.scheme.onSurface
                const onListItemPanResponderRelease = handleListItemPanResponderRelease({
                        onActiveAfterAffordance,
                        disabled
                })(itemKey)

                const panResponder = useRef(
                        PanResponder.create({
                                onMoveShouldSetPanResponder: (_event, gestureState) =>
                                        Math.abs(gestureState.dx) > Math.abs(gestureState.dy),

                                onPanResponderGrant: (_event, _gestureState) => {},
                                onPanResponderMove: (_event, _gestureState) => {},
                                onPanResponderRelease: onListItemPanResponderRelease
                        })
                ).current

                const onListItemFocus = useMemo(() => handleListItemFocus(setState)(itemIndex), [itemIndex, setState])
                const onListItemConfirm = ({itemKey: value, ...options}: ListAfterAffordancePressOutOptions) =>
                        handleListItemConfirm({
                                options,
                                onActiveAfterAffordance,
                                onListItemClose,
                                onConfirm
                        })(value)

                const onListItemClose = handleListItemClose({onClose, onVisible})(itemKey)
                const onListItemTrailingPressOut = () =>
                        handleListItemTrailingPressOut({
                                afterAffordance,
                                closeTrailing,
                                onActiveAfterAffordance,
                                onListItemClose
                        })(itemKey)

                const onListItemAfterAffordanceVisibleFinished = useMemo(
                        () => handleItemListAfterAffordanceVisibleFinished(setState),
                        [setState]
                )

                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleListItemStateChange({
                                        ...options,
                                        itemIndex,
                                        itemKey,
                                        onActive,
                                        onLoadEnd,
                                        selectType,
                                        state,
                                        trailingTrigger,
                                        type
                                })(setState)(event)

                const onStateEvent = useOnStateEvent({
                        ...renderProps,
                        onStateEventChange,
                        disabled
                })

                const {contentAnimatedStyle, headlineTextAnimatedStyle} = useListItemAnimated({
                        active,
                        afterAffordanceVisible,
                        onListItemAfterAffordanceVisibleFinished
                })

                const trailingElement = renderListItemTrailing({
                        afterAffordance,
                        closeTrailing,
                        disabled,
                        onStateEvent: {onPressOut: onListItemTrailingPressOut},
                        theme,
                        trailing,
                        trailingProps
                })

                const leadingElement =
                        leading && selectType ? cloneElement(leading, {type: active ? 'filled' : 'outlined'}) : leading

                useImperativeHandle(ref, () => (touchableRef?.current ? touchableRef?.current : {}) as View, [])

                useEffect(() => {
                        onListItemFocus(focusedIndex)
                }, [focusedIndex, onListItemFocus])

                useEffect(() => {
                        onListItemClose(close)
                }, [close, onListItemClose])

                useEffect(() => {
                        nextPressOutEvent?.()
                }, [nextPressOutEvent])

                useEffect(() => {
                        nextLayoutEvent?.()
                }, [nextLayoutEvent])

                useEffect(() => {
                        nextFocusEvent?.()
                }, [nextFocusEvent])

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
                        headlineTextAnimatedStyle,
                        id,
                        itemKey,
                        leadingElement,
                        onConfirm: onListItemConfirm,
                        onStateEvent,
                        panResponder: [afterAffordance, beforeAffordance].some(Boolean) ? panResponder : undefined,
                        ref: touchableRef,
                        selectType,
                        shape,
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
