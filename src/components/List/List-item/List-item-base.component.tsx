import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import {useStateEvent} from '../../../hooks'
import {runAfterInteractions} from '../../../utils'
import type {State} from '../../Common'
import type {ListAfterAffordancePressOutOptions} from '../List-after-affordance'
import {LIST_SELECT_TYPE, LIST_TYPE} from '../List.enum'
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
import type {ListItemBaseProps, ListItemState} from './List-item.interface'
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
			indexKey,
			itemIndex,
			leading,
			onActive,
			onActiveAfterAffordance,
			onClose,
			onConfirm,
			onLoadEnd,
			render,
			selectType,
			shape,
			supporting,
			trailing,
			trailingProps,
			trailingTriggerEvenName,
			type = LIST_TYPE.STANDARD,
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
			() =>
				selectType === LIST_SELECT_TYPE.SINGLE ?
					activeKey === indexKey
				:	activeKeys?.includes(indexKey),
			[activeKey, activeKeys, indexKey, selectType]
		)

		const theme = useTheme()
		const afterAffordanceVisible = useMemo(
			() => afterAffordanceActiveKey === indexKey,
			[afterAffordanceActiveKey, indexKey]
		)

		/**
		 * TODO: Support mobile touch swipe.
		 */
		// const onListItemPanResponderRelease = handleListItemPanResponderRelease({
		//         onActiveAfterAffordance,
		//         disabled
		// })(indexKey)

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
		const onListItemConfirm = ({indexKey: key, ...options}: ListAfterAffordancePressOutOptions) =>
			handleListItemConfirm({options, onActiveAfterAffordance, onListItemClose, onConfirm})(key)

		const onListItemClose = handleListItemClose(onClose)(indexKey)
		const onListItemTrailingPressOut = handleListItemTrailingPressOut({
			afterAffordance,
			closeTrailing,
			onActiveAfterAffordance,
			onListItemClose
		})(indexKey)

		const onListItemTrailingPressIn = handleListItemTrailingPressIn(setState)
		const onListItemAfterAffordanceVisibleFinished = useMemo(
			() => handleItemListAfterAffordanceVisibleFinished(setState),
			[setState]
		)

		const onStateEventChange =
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleListItemStateChange({
					...options,
					activeTriggerEvenName,
					itemIndex,
					indexKey,
					onActive,
					onLoadEnd,
					selectType,
					state,
					trailingTriggerEvenName,
					type
				})(setState)(event)

		const interactionHandlers = useStateEvent({...renderProps, onStateEventChange, disabled})
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
			interactionHandlers: {
				onPressOut: onListItemTrailingPressOut,
				onPressIn: onListItemTrailingPressIn
			},
			theme,
			trailing,
			trailingProps
		})

		// const leadingElement =
		//         leading ?
		//                 cloneElement(leading, {
		//                         ...(selectType && {type: active ? 'filled' : 'outlined'}),
		//                         testID: `listItem__leading--${id}`
		//                 })
		//         :       undefined

		useImperativeHandle(ref, () => (pressableRef?.current ?? {}) as View, [pressableRef])

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
			indexKey,
			leadingElement: leading,
			onConfirm: onListItemConfirm,
			interactionHandlers,
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
