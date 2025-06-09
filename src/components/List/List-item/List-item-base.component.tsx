import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../../hooks'
import {createDeferredHandlerWithState, runAfterInteractions} from '../../../utils'
import {COMPONENT_STATUS, type State} from '../../Common'
import {ACTIVE_TRIGGER_EVEN_NAME, LIST_SELECT_TYPE, LIST_TYPE} from '../List.enum'
import {
	confirmListItemAffordanceAction,
	handleListItemStateChange,
	maybeTriggerListItemClose,
	triggerListItemTrailingActions,
	updateListItemAfterAffordanceExpanded,
	updateListItemFocusState
} from './List-item.handler'
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
			onClose: rawOnClose,
			onConfirm: rawOnConfirm,
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
				afterAffordanceExpanded: isAfterAffordanceExpanded,
				eventName,
				nextLayoutEvent,
				nextPressInEvent,
				nextPressOutEvent,
				trailingVisible: isTrailingVisible
			},
			setState
		] = useImmer<ListItemState>({status: COMPONENT_STATUS.IDLE, afterAffordanceExpanded: false})

		const id = useId()
		const theme = useTheme()
		const pressableRef = useRef<View>(null)
		const isAfterAffordanceVisible = afterAffordanceActiveKey === indexKey
		const isActive = !!(selectType === LIST_SELECT_TYPE.SINGLE ?
			activeKey === indexKey
		:	indexKey && activeKeys?.includes(indexKey))

		const onItemClose = useMemo(
			() => maybeTriggerListItemClose(rawOnClose)(indexKey),
			[indexKey, rawOnClose]
		)

		const onConfirm = useMemo(
			() =>
				confirmListItemAffordanceAction({
					onActiveAfterAffordance,
					onConfirm: rawOnConfirm,
					onItemClose
				}),
			[onActiveAfterAffordance, onItemClose, rawOnConfirm]
		)

		const onTrailingPressOut = useMemo(
			() =>
				triggerListItemTrailingActions({
					afterAffordance,
					closeTrailing,
					onActiveAfterAffordance,
					onItemClose
				})(indexKey),
			[afterAffordance, closeTrailing, indexKey, onActiveAfterAffordance, onItemClose]
		)

		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
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

		const interactionHandlers = useInteractionStateEvent({
			...renderListItemProps,
			disabled,
			onStateEventChange
		})

		const {contentAnimatedStyle, headlineTextAnimatedStyle} = useListItemAnimated({
			active: isActive,
			afterAffordanceVisible: isAfterAffordanceVisible
		})

		const runUpdateFocusState = useMemo(
			() => updateListItemFocusState(itemIndex)(setState),
			[itemIndex, setState]
		)

		const runMaybeTriggerClose = useMemo(
			() => maybeTriggerListItemClose(rawOnClose)(indexKey),
			[indexKey, rawOnClose]
		)

		const runUpdateAfterAffordanceVisible = useMemo(
			() =>
				createDeferredHandlerWithState(updateListItemAfterAffordanceExpanded)(setState)({
					debounceMillisecond: 400
				}),
			[setState]
		)

		const runUpdateAfterAffordanceNotVisible = useMemo(
			() => updateListItemAfterAffordanceExpanded(setState),
			[setState]
		)

		const trailingElement = useMemo(
			() =>
				renderListItemTrailing({
					afterAffordance,
					closeTrailing,
					disabled,
					id,
					interactionHandlers: {onPressOut: onTrailingPressOut},
					theme,
					trailing,
					trailingProps
				}),
			[
				afterAffordance,
				closeTrailing,
				disabled,
				id,
				onTrailingPressOut,
				theme,
				trailing,
				trailingProps
			]
		)

		useImperativeHandle(ref, () => (pressableRef?.current ?? {}) as View, [pressableRef])

		useEffect(() => {
			if (isAfterAffordanceVisible) {
				runUpdateAfterAffordanceVisible(isAfterAffordanceVisible)

				return
			}

			runUpdateAfterAffordanceNotVisible(isAfterAffordanceVisible)
		}, [isAfterAffordanceVisible, runUpdateAfterAffordanceNotVisible, runUpdateAfterAffordanceVisible])

		useEffect(() => {
			runUpdateFocusState(focusedIndex)
		}, [runUpdateFocusState, focusedIndex])

		useEffect(() => {
			runMaybeTriggerClose(close)
		}, [close, runMaybeTriggerClose])

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
			active: isActive,
			afterAffordance,
			afterAffordanceVisible: isAfterAffordanceVisible,
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
			onConfirm,
			ref: pressableRef,
			selectType,
			shape,
			supporting,
			theme,
			trailingElement,
			trailingTriggerEvenName,
			trailingVisible: isTrailingVisible,
			type,
			afterAffordanceExpanded: isAfterAffordanceExpanded
		})
	}
)
