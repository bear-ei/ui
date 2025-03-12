import {cloneElement, forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {HandleStateEventChangeOptions, StateEventType, useStateEvent} from '../../../hooks'
import {runAfterInteractions} from '../../../utils'
import {State} from '../../Common'
import {ListAfterAffordancePressOutOptions} from '../List-after-affordance'
import {
        handleItemListAfterAffordanceVisibleFinished,
        handleListItemClose,
        handleListItemConfirm,
        handleListItemFocus,
        handleListItemStateChange,
        handleListItemTrailingPressIn,
        handleListItemTrailingPressOut,
        renderListItemTrailing
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
                        onConfirm,
                        onLoadEnd,
                        onClose,
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
                                affordanceShow,
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

                const id = useId()
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

                // const onListItemPanResponderRelease = handleListItemPanResponderRelease({
                //         onActiveAfterAffordance,
                //         disabled
                // })(itemKey)

                // const panResponder = useRef(
                //         PanResponder.create({
                //                 onMoveShouldSetPanResponder: (_event, gestureState) =>
                //                         Math.abs(gestureState.dx) > Math.abs(gestureState.dy),

                //                 onPanResponderGrant: (_event, _gestureState) => {},
                //                 onPanResponderMove: (_event, _gestureState) => {},
                //                 onPanResponderRelease: onListItemPanResponderRelease
                //         })
                // ).current

                const onListItemFocus = useMemo(() => handleListItemFocus(setState)(itemIndex), [itemIndex, setState])
                const onListItemConfirm = ({itemKey: value, ...options}: ListAfterAffordancePressOutOptions) =>
                        handleListItemConfirm({options, onActiveAfterAffordance, onListItemClose, onConfirm})(value)

                const onListItemClose = handleListItemClose(onClose)(itemKey)
                const onListItemTrailingPressOut = handleListItemTrailingPressOut({
                        afterAffordance,
                        closeTrailing,
                        onActiveAfterAffordance,
                        onListItemClose
                })(itemKey)

                const onListItemTrailingPressIn = handleListItemTrailingPressIn(setState)
                const onListItemAfterAffordanceVisibleFinished = useMemo(
                        () => handleItemListAfterAffordanceVisibleFinished(setState),
                        [setState]
                )

                const onStateEventChange =
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEventType) =>
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

                const stateEvent = useStateEvent({...renderProps, onStateEventChange, disabled})
                const {contentAnimatedStyle, headlineTextAnimatedStyle} = useListItemAnimated({
                        active,
                        afterAffordanceVisible,
                        onListItemAfterAffordanceVisibleFinished
                })

                const trailingElement = renderListItemTrailing({
                        afterAffordance,
                        closeTrailing,
                        disabled,
                        id,
                        stateEvent: {onPressOut: onListItemTrailingPressOut, onPressIn: onListItemTrailingPressIn},
                        theme,
                        trailing,
                        trailingProps
                })

                const leadingElement = cloneElement(leading ?? <></>, {
                        ...(selectType && {type: active ? 'filled' : 'outlined'}),
                        testID: `listItem__leading--${id}`
                })

                useImperativeHandle(ref, () => (pressableRef?.current ? pressableRef?.current : {}) as View, [
                        pressableRef
                ])

                useEffect(() => {
                        onListItemFocus(focusedIndex)
                }, [focusedIndex, onListItemFocus])

                useEffect(() => {
                        onListItemClose(close)
                }, [close, onListItemClose])

                useEffect(() => {
                        runAfterInteractions(nextPressInEvent)()
                }, [nextPressInEvent])

                useEffect(() => {
                        runAfterInteractions(nextPressOutEvent)()
                }, [nextPressOutEvent])

                useEffect(() => {
                        runAfterInteractions(nextLayoutEvent)()
                }, [nextLayoutEvent])

                return render({
                        ...renderProps,
                        active,
                        affordanceShow,
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
                        stateEvent,
                        // panResponder: [afterAffordance, beforeAffordance].some(Boolean) ? panResponder : undefined,
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
