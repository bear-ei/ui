import {useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {ListItemBaseProps, ListItemRef, ListItemState} from './List-item.interface'

import {COMPONENT_STATUS, type State} from '../../../constants'
import {
	useInteractionStateEvent,
	useMergeRefs,
	usePendingEvent,
	type HandleStateEventChangeOptions,
	type StateEvent
} from '../../../hooks'
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
	updateListItemTrailingVisible
} from './List-item.handler'
import {RenderListItem, RenderListItemTrailing} from './List-item.render'
import {useListItemAnimated} from './use-list-item-animated.hook'

export const ListItemBase: FC<ListItemBaseProps> = ({
	activeKey,
	activeKeys,
	afterAffordance,
	afterAffordanceActiveKey,
	closeTrailing,
	disabled,
	enableUnderlay = true,
	enableUnderlayActive = true,
	focusedIndex,
	indexKey,
	itemIndex,
	leading,
	onActive: rawOnActive,
	onActiveAfterAffordance,
	onClose: rawOnClose,
	onLoadEnd,
	onTrailingPressOut: rawOnTrailingPressOut,
	ref,
	selectType,
	shape,
	size,
	supporting,
	trailing,
	trailingTriggerOn,
	type = LIST_TYPE.STANDARD,
	...renderListItemProps
}) => {
	const [
		{
			afterAffordanceExpanded: isAfterAffordanceExpanded,
			eventName,
			pendingActiveEvent,
			pendingLoadEnd,
			status,
			trailingVisible: isTrailingVisible
		},
		setState
	] = useImmer<ListItemState>({status: COMPONENT_STATUS.IDLE})

	usePendingEvent('pendingActiveEvent', rawOnActive, {pendingEvent: pendingActiveEvent, setState})
	usePendingEvent('pendingLoadEnd', onLoadEnd, {pendingEvent: pendingLoadEnd, setState})

	const id = useId()
	const pressableRef = useRef<ListItemRef>(null)
	const mergedRef = useMergeRefs([ref, pressableRef])
	const isAfterAffordanceVisible = indexKey ? afterAffordanceActiveKey === indexKey : undefined
	const isActive = !!(selectType === LIST_SELECT_TYPE.SINGLE ?
		activeKey === indexKey
	:	indexKey && activeKeys?.includes(indexKey))

	const onClose = useMemo(() => maybeTriggerListItemClose(indexKey, rawOnClose), [indexKey, rawOnClose])
	const onTrailingVisible = useMemo(() => updateListItemTrailingVisible(setState), [setState])
	const onConfirm = useMemo(
		() => confirmListItemAffordanceAction({onActiveAfterAffordance, onClose}),
		[onActiveAfterAffordance, onClose]
	)

	const onTrailingPressOut = useMemo(
		() =>
			triggerListItemTrailingActions(indexKey, {
				afterAffordance,
				closeTrailing,
				onActiveAfterAffordance,
				onClose,
				onPressOut: rawOnTrailingPressOut
			}),
		[afterAffordance, closeTrailing, indexKey, onActiveAfterAffordance, onClose, rawOnTrailingPressOut]
	)

	const onActive = useMemo(() => updateListItemActive(selectType, rawOnActive), [rawOnActive, selectType])
	const onStateEventChange = useCallback(
		(event: StateEvent, _state: State, options: HandleStateEventChangeOptions) =>
			handleListItemStateChange(event, setState, {...options, indexKey, itemIndex, onActive, onLoadEnd, type}),
		[indexKey, itemIndex, onActive, onLoadEnd, setState, type]
	)

	const handleActive = useCallback(() => onActive(indexKey), [indexKey, onActive])
	const interactionHandlers = useInteractionStateEvent({...renderListItemProps, disabled, onStateEventChange})
	const {contentAnimatedStyle, headlineTextAnimatedStyle} = useListItemAnimated({
		active: isActive,
		afterAffordanceVisible: isAfterAffordanceVisible,
		status
	})

	const runUpdateFocusState = useMemo(() => updateListItemFocusState(itemIndex, setState), [itemIndex, setState])
	const runUpdateAfterAffordanceVisible = useMemo(() => updateListItemAfterAffordanceExpanded(setState), [setState])
	const runTrailingTriggerEvent = useMemo(
		() => handleTrailingTriggerEvent(setState, trailingTriggerOn),
		[setState, trailingTriggerOn]
	)

	const trailingElement =
		[closeTrailing, afterAffordance, trailing].some(Boolean) ?
			<RenderListItemTrailing
				afterAffordance={afterAffordance}
				closeTrailing={closeTrailing}
				disabled={disabled}
				id={id}
				interactionHandlers={{onPressOut: onTrailingPressOut}}
				onTrailingVisible={onTrailingVisible}
				size={size}
				trailing={trailing}
				trailingTriggerOn={trailingTriggerOn}
			/>
		:	undefined

	useImperativeHandle(mergedRef, () => ({active: handleActive, close: onClose}) as ListItemRef, [
		handleActive,
		onClose
	])

	useEffect(() => {
		runUpdateAfterAffordanceVisible(isAfterAffordanceVisible)
	}, [isAfterAffordanceVisible, runUpdateAfterAffordanceVisible])

	useEffect(() => {
		runTrailingTriggerEvent(eventName)
	}, [eventName, runTrailingTriggerEvent])

	useEffect(() => {
		runUpdateFocusState(focusedIndex)
	}, [runUpdateFocusState, focusedIndex])

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
			ref={mergedRef}
			selectType={selectType}
			shape={shape}
			size={size}
			supporting={supporting}
			trailingElement={trailingElement}
			trailingTriggerOn={trailingTriggerOn}
			trailingVisible={isTrailingVisible ?? !trailingTriggerOn}
			type={type}
		/>
	)
}
