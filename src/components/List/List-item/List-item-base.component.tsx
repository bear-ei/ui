import {cloneElement, forwardRef, useEffect, useImperativeHandle, useMemo, useRef} from 'react'
import {PanResponder, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../../hooks'
import {State} from '../../Common'
import {ListAfterAffordancePressOutOptions} from '../List-after-affordance'
import {
        handleItemListAfterAffordanceVisibleFinished,
        handleListItemClose,
        handleListItemConfirm,
        handleListItemFocus,
        handleListItemPanResponderRelease,
        handleListItemStateChange,
        handleListItemTrailing,
        handleListItemTrailingPressOut
} from './List-item-handle'
import {ListItemBaseProps, ListItemState} from './List-item.interface'
import {useListItemAnimated} from './use-list-item-animated.hook'

export const ListItemBase = forwardRef<View, ListItemBaseProps>(
        (
                {
                        activeKey,
                        activeKeys,
                        activeTriggerEvenName,
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
                        trailingTriggerEvenName,
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
                                nextLayoutEvent,
                                nextPressInEvent,
                                nextPressOutEvent,
                                trailingVisible
                        },
                        setState
                ] = useImmer<ListItemState>({status: 'idle'})

                const pressableRef = useRef<View>(null)
                const active = useMemo(
                        () => (selectType === 'select' ? activeKey === itemKey : activeKeys?.includes(itemKey)),
                        [activeKey, activeKeys, itemKey, selectType]
                )

                const theme = useTheme()
                const afterAffordanceVisible = useMemo(
                        () => afterAffordanceActiveKey === itemKey,
                        [afterAffordanceActiveKey, itemKey]
                )

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
                        handleListItemConfirm({options, onActiveAfterAffordance, onListItemClose, onConfirm})(value)

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
                                        activeTriggerEvenName,
                                        itemIndex,
                                        itemKey,
                                        onActive,
                                        onLoadEnd,
                                        selectType,
                                        state,
                                        trailingTriggerEvenName,
                                        type
                                })(setState)(event)

                const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange, disabled})
                const {contentAnimatedStyle, headlineTextAnimatedStyle} = useListItemAnimated({
                        active,
                        afterAffordanceVisible,
                        onListItemAfterAffordanceVisibleFinished
                })

                const trailingElement = handleListItemTrailing({
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

                useImperativeHandle(ref, () => (pressableRef?.current ? pressableRef?.current : {}) as View, [])

                useEffect(() => {
                        onListItemFocus(focusedIndex)
                }, [focusedIndex, onListItemFocus])

                useEffect(() => {
                        onListItemClose(close)
                }, [close, onListItemClose])

                useEffect(() => {
                        nextLayoutEvent?.()
                }, [nextLayoutEvent])

                useEffect(() => {
                        nextPressInEvent?.()
                }, [nextPressInEvent])

                useEffect(() => {
                        nextPressOutEvent?.()
                }, [nextPressOutEvent])

                return render({
                        ...renderProps,
                        active,
                        afterAffordance,
                        afterAffordanceVisible: !afterAffordanceClosed,
                        beforeAffordance,
                        contentAnimatedStyle,
                        disabled,
                        enableUnderlay,
                        enableUnderlayActive,
                        eventName,
                        headlineTextAnimatedStyle,
                        itemKey,
                        leadingElement,
                        onConfirm: onListItemConfirm,
                        onStateEvent,
                        panResponder: [afterAffordance, beforeAffordance].some(Boolean) ? panResponder : undefined,
                        ref: pressableRef,
                        selectType,
                        shape,
                        state: listItemState,
                        supporting,
                        theme,
                        trailingElement,
                        trailingTriggerEvenName,
                        trailingVisible,
                        type
                })
        }
)
