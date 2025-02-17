import {cloneElement} from 'react'
import {GestureResponderEvent, PanResponderGestureState, ViewProps} from 'react-native'
import {SharedValue} from 'react-native-reanimated'
import {Updater} from 'use-immer'
import {AnimatedTiming, StateEvent} from '../../../hooks'
import {EventName} from '../../Common'
import {Icon} from '../../Icon'
import {IconButton, IconButtonType} from '../../Icon-button'
import {
        HandleListItemAfterAffordanceVisibleAnimatedTimingOptions,
        HandleListItemConfirmOptions,
        HandleListItemPanResponderReleaseOptions,
        HandleListItemStateEventChangeOptions,
        HandleListItemTrailingPressOutOptions,
        ListItemProps,
        ListItemState,
        RenderListItemTrailingOptions,
        SelectType
} from './List-item.interface'

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

const handleListItemActive = (selectType?: SelectType) => (onActive?: (value?: string) => void) => (value: string) =>
        selectType && onActive?.(value)

const handleListItemLoadEnd = (onLoadEnd?: (value?: string) => void) => (value?: string) => onLoadEnd?.(value)
export const handleListItemStateChange =
        ({
                activeTriggerEvenName,
                eventName,
                itemKey,
                onActive,
                onLoadEnd,
                selectType,
                state,
                trailingTriggerEvenName,
                type
        }: HandleListItemStateEventChangeOptions) =>
        (setState: Updater<ListItemState>) =>
        (_event: StateEvent) => {
                const nextEvent = {
                        layout: () => handleListItemLoadEnd?.(onLoadEnd)(itemKey),
                        pressIn: () => handleListItemActive(selectType)(onActive)(itemKey),
                        pressOut: () => handleListItemActive(selectType)(onActive)(itemKey)
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

                        if (eventName && draft.status === 'succeeded') {
                                draft.eventName = eventName
                                draft.listItemState = state
                        }

                        if (trailingTriggerEvenName) {
                                const visible =
                                        trailingTriggerEvenName === 'hoverIn' ?
                                                state &&
                                                ['hovered', 'longPressIn', 'pressIn', 'focused'].includes(state)
                                        :       trailingTriggerEvenName === state

                                draft.trailingVisible = visible
                        }

                        switch (eventName) {
                                case 'layout':
                                        draft.nextLayoutEvent = nextEvent[eventName]
                                        draft.status = 'succeeded'
                                        break

                                case 'pressIn':
                                        if (activeTriggerEvenName === 'pressIn') {
                                                draft.nextPressInEvent = nextEvent[eventName]
                                        }

                                        break

                                case 'pressOut':
                                        if (activeTriggerEvenName === 'pressOut') {
                                                draft.nextPressOutEvent = nextEvent[eventName]
                                        }

                                        break

                                default:
                                        break
                        }
                })
        }

export const handleListItemTrailingPressOut =
        ({
                afterAffordance,
                closeTrailing,
                onActiveAfterAffordance,
                onListItemClose
        }: HandleListItemTrailingPressOutOptions) =>
        (value: string) =>
        () => {
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

export const handleListItemTrailingPressIn = (setState: Updater<ListItemState>) => () => {
        setState(draft => {
                draft.affordanceShow = true
        })
}

export const handleItemListAfterAffordanceVisibleFinished = (setState: Updater<ListItemState>) => (value?: boolean) =>
        setState(draft => {
                draft.afterAffordanceClosed = !value
        })

export const handleItemListAffordanceShow = (setState: Updater<ListItemState>) => () =>
        setState(draft => {
                draft.affordanceShow = true
        })

export const handleListItemConfirm =
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
export const handleListItemFocus =
        (setState: Updater<ListItemState>) => (itemIndex?: number) => (focusedIndex?: number) =>
                typeof focusedIndex === 'number' &&
                setState(draft => {
                        draft.eventName = itemIndex === focusedIndex ? 'focus' : 'blur'
                })

export const handleListItemClose = (onClose?: (value?: string) => void) => (itemKey: string) => (value?: boolean) => {
        if (!value) {
                return
        }

        onClose?.(itemKey)
}

export const handleListItemPanResponderRelease =
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

export const renderListItemTrailing = ({
        afterAffordance,
        closeTrailing,
        disabled,
        onStateEvent,
        trailing,
        trailingProps,
        id
}: RenderListItemTrailingOptions) => {
        const {onHoverIn, onHoverOut} = onStateEvent
        const standardTrailing = closeTrailing ? 'closeTrailing' : 'standard'
        const trailingType = afterAffordance ? 'afterAffordance' : standardTrailing
        const props = {
                disabled,
                pointerEvents: 'box-only' as ViewProps['pointerEvents'],
                type: 'standard' as IconButtonType,
                testID: `listItem__trailing--${id}`,
                ...onStateEvent,
                ...trailingProps
        }

        const trailingElement = {
                afterAffordance:
                        trailing ?
                                cloneElement(trailing, props)
                        :       <IconButton
                                        {...props}
                                        testID={`listItem__trailingIconButton--${id}`}
                                        icon={
                                                <Icon
                                                        iconStyle='rounded'
                                                        name='moreHoriz'
                                                        testID={`listItem__trailingIconMoreHoriz--${id}`}
                                                        type='outlined'
                                                />
                                        }
                                />,
                closeTrailing:
                        trailing ?
                                cloneElement(trailing, props)
                        :       <IconButton
                                        {...props}
                                        testID={`listItem__trailingIconButton--${id}`}
                                        icon={
                                                <Icon
                                                        iconStyle='rounded'
                                                        name='close'
                                                        testID={`listItem__trailingIconClose--${id}`}
                                                        type='outlined'
                                                />
                                        }
                                />,
                standard: trailing ? cloneElement(trailing, {onHoverIn, onHoverOut, ...props}) : undefined
        }

        return trailingElement[trailingType]
}

export const handleListItemAfterAffordanceVisibleAnimatedTiming =
        ({
                animatedTiming,
                onListItemAfterAffordanceVisibleFinished
        }: HandleListItemAfterAffordanceVisibleAnimatedTimingOptions) =>
        (contentLeftSharedValue: SharedValue<number>) =>
        (value?: boolean) =>
                animatedTiming({
                        callback: (finished?: boolean) => finished && onListItemAfterAffordanceVisibleFinished?.(value)
                })(contentLeftSharedValue)(value ? 1 : 0)

export const handleListItemActiveAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (headlineTextSharedValue: SharedValue<number>) => (value?: boolean) =>
                animatedTiming()(headlineTextSharedValue)(value ? 1 : 0)
