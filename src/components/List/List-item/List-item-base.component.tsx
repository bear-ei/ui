import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useStateEvent, type ProcessStateEventChangeOptions, type StateEvent} from '../../../hooks'
import {createHandler, createHandlerFinal, runAfterInteractions} from '../../../utils'
import {COMPONENT_STATUS, type State} from '../../Common'
import {ACTIVE_TRIGGER_EVEN_NAME, LIST_SELECT_TYPE, LIST_TYPE} from '../List.enum'
import {
	handleItemListAfterAffordanceVisibleFinished,
	handleListItemClose,
	handleListItemConfirm,
	handleListItemFocus,
	handleListItemStateChange,
	handleListItemTrailingPressIn,
	handleListItemTrailingPressOut
} from './List-item-handle'
import type {ListItemBaseProps, ListItemState} from './List-item.interface'
import {renderListItemTrailing} from './List-item.render'
import {useListItemAnimated} from './use-list-item-animated.hook'

export const ListItemBase = forwardRef<View, ListItemBaseProps>(
	(
		{
			activeKey,
			activeKeys,
			activeTriggerEvenName = ACTIVE_TRIGGER_EVEN_NAME.PRESS_OUT,
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
			renderListItem,
			selectType,
			shape,
			supporting,
			trailing,
			trailingProps,
			trailingTriggerEvenName,
			type = LIST_TYPE.STANDARD,
			...renderListItemProps
		},
		ref
	) => {
		const [
			{
				affordanceVisible: isAffordanceVisible,
				afterAffordanceClosed: isAfterAffordanceClosed,
				eventName,
				listItemState,
				nextLayoutEvent,
				nextPressInEvent,
				nextPressOutEvent,
				trailingVisible: isTrailingVisible
			},
			setState
		] = useImmer<ListItemState>({status: COMPONENT_STATUS.IDLE})

		const id = useId()
		const theme = useTheme()
		const pressableRef = useRef<View>(null)
		const isAfterAffordanceVisible = afterAffordanceActiveKey === indexKey
		const isActive = !!(selectType === LIST_SELECT_TYPE.SINGLE ?
			activeKey === indexKey
		:	indexKey && activeKeys?.includes(indexKey))

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

		const onListItemFocus = useMemo(
			() => createHandler(handleListItemFocus(itemIndex))(setState)(),
			[itemIndex, setState]
		)

		const onListItemClose = useMemo(
			() => createHandlerFinal(handleListItemClose(onClose)(indexKey))(),
			[indexKey, onClose]
		)

		const onListItemConfirm = useMemo(
			() =>
				createHandlerFinal(
					handleListItemConfirm({onActiveAfterAffordance, onListItemClose, onConfirm})
				)(),
			[onActiveAfterAffordance, onConfirm, onListItemClose]
		)

		const onListItemTrailingPressOut = useMemo(
			() =>
				createHandlerFinal(
					handleListItemTrailingPressOut({
						afterAffordance,
						closeTrailing,
						onActiveAfterAffordance,
						onListItemClose
					})(indexKey)
				)(),
			[afterAffordance, closeTrailing, indexKey, onActiveAfterAffordance, onListItemClose]
		)

		const onListItemTrailingPressIn = useMemo(
			() => createHandler(handleListItemTrailingPressIn)(setState)(),
			[setState]
		)

		const onListItemAfterAffordanceVisibleFinished = useMemo(
			() => createHandler(handleItemListAfterAffordanceVisibleFinished)(setState)(),
			[setState]
		)

		const onStateEventChange = useCallback(
			(options: ProcessStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleListItemStateChange({
					...options,
					activeTriggerEvenName,
					indexKey,
					itemIndex,
					onActive,
					onLoadEnd,
					selectType,
					state,
					trailingTriggerEvenName,
					type
				})(setState)(event),
			[
				activeTriggerEvenName,
				indexKey,
				itemIndex,
				onActive,
				onLoadEnd,
				selectType,
				setState,
				trailingTriggerEvenName,
				type
			]
		)

		const interactionHandlers = useStateEvent({...renderListItemProps, onStateEventChange, disabled})
		const {contentAnimatedStyle, headlineTextAnimatedStyle} = useListItemAnimated({
			active: isActive,
			afterAffordanceVisible: isAfterAffordanceVisible,
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

		return renderListItem({
			...renderListItemProps,
			// panResponder: [afterAffordance, beforeAffordance].some(Boolean) ? panResponder : undefined,
			active: isActive,
			affordanceVisible: isAffordanceVisible,
			afterAffordance,
			afterAffordanceVisible: !isAfterAffordanceClosed,
			beforeAffordance,
			contentAnimatedStyle,
			disabled,
			enableUnderlay,
			enableUnderlayActive,
			eventName,
			headlineTextAnimatedStyle,
			id,
			indexKey,
			interactionHandlers,
			leadingElement: leading,
			onConfirm: onListItemConfirm,
			ref: pressableRef,
			selectType,
			shape,
			state: listItemState,
			supporting,
			theme,
			trailingElement,
			trailingTriggerEvenName,
			trailingVisible: isTrailingVisible,
			type
		})
	}
)
