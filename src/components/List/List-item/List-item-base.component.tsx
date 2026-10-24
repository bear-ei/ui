import {useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {ListItemBaseProps, ListItemRef, ListItemState} from './List-item.interface'

import {COMPONENT_STATUS, type InteractionState} from '../../../constants'
import {
	useInteractionStateEvent,
	useMergeRefs,
	usePendingEvent,
	type HandleInteractionStateChangeOptions,
	type InteractionEvent
} from '../../../hooks'
import {LIST_SELECTION_TYPE, LIST_TYPE} from '../List.enum'
import {
	confirmListItemAffordanceAction,
	handleListItemStateChange,
	handleTrailingTriggerEvent,
	maybeTriggerListItemClose,
	triggerListItemTrailingActions,
	handleListItemActive,
	updateListItemAfterAffordanceExpanded,
	updateListItemFocusState,
	updateListItemTrailingHoverEvent
} from './List-item.handler'
import {RenderListItem, RenderListItemTrailing} from './List-item.render'
import {useListItemAnimated} from './use-list-item-animated.hook'

export const ListItemBase: FC<ListItemBaseProps> = ({
	activeKey,
	activeKeys,
	afterAffordance,
	afterAffordanceActiveKey,
	disabled,
	enableTrailingClose,
	enableUnderlay = true,
	enableUnderlayActive = true,
	focusedIndex,
	itemIndex,
	itemKey,
	leading,
	onActiveKeyChange: rawOnActiveKeyChange,
	onAfterAffordanceActiveChange,
	onClose: rawOnClose,
	onLoadEnd,
	onTrailingPressOut: rawOnTrailingPressOut,
	ref,
	selectionType,
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
			pendingLoadEndEvent,
			status,
			trailingVisible: isTrailingVisible
		},
		setState
	] = useImmer<ListItemState>({status: COMPONENT_STATUS.IDLE})

	usePendingEvent('pendingActiveEvent', rawOnActiveKeyChange, {pendingEvent: pendingActiveEvent, setState})
	usePendingEvent('pendingLoadEndEvent', onLoadEnd, {pendingEvent: pendingLoadEndEvent, setState})

	const id = useId()
	const pressableRef = useRef<ListItemRef>(null)
	const mergedRef = useMergeRefs([ref, pressableRef])
	const isAfterAffordanceVisible = itemKey ? afterAffordanceActiveKey === itemKey : undefined
	const isActive = !!(selectionType === LIST_SELECTION_TYPE.SINGLE ?
		activeKey === itemKey
	:	itemKey && activeKeys?.includes(itemKey))

	const onClose = useMemo(() => maybeTriggerListItemClose(itemKey, rawOnClose), [itemKey, rawOnClose])
	const onTrailingHoverIn = useMemo(() => updateListItemTrailingHoverEvent(setState), [setState])
	const onPrimaryAction = useMemo(
		() => confirmListItemAffordanceAction({onAfterAffordanceActiveChange, onClose}),
		[onAfterAffordanceActiveChange, onClose]
	)

	const onTrailingPressOut = useMemo(
		() =>
			triggerListItemTrailingActions(itemKey, {
				afterAffordance,
				enableTrailingClose,
				onAfterAffordanceActiveChange,
				onClose,
				onPressOut: rawOnTrailingPressOut
			}),
		[afterAffordance, enableTrailingClose, itemKey, onAfterAffordanceActiveChange, onClose, rawOnTrailingPressOut]
	)

	const onActiveKeyChange = useMemo(
		() => handleListItemActive(selectionType, rawOnActiveKeyChange),
		[rawOnActiveKeyChange, selectionType]
	)
	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, _interactionState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handleListItemStateChange(event, setState, {
				...options,
				itemIndex,
				itemKey,
				onActiveKeyChange,
				onLoadEnd,
				type
			}),
		[itemKey, itemIndex, onActiveKeyChange, onLoadEnd, setState, type]
	)

	const activate = useCallback(() => onActiveKeyChange(itemKey), [itemKey, onActiveKeyChange])
	const interactionHandlers = useInteractionStateEvent({...renderListItemProps, disabled, onInteractionStateChange})
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
		[enableTrailingClose, afterAffordance, trailing].some(Boolean) ?
			<RenderListItemTrailing
				afterAffordance={afterAffordance}
				disabled={disabled}
				enableTrailingClose={enableTrailingClose}
				id={id}
				interactionHandlers={{onPressOut: onTrailingPressOut}}
				onTrailingHoverIn={onTrailingHoverIn}
				size={size}
				trailing={trailing}
				trailingTriggerOn={trailingTriggerOn}
			/>
		:	undefined

	useImperativeHandle(mergedRef, () => ({activate, close: onClose}) as ListItemRef, [activate, onClose])

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
			contentAnimatedStyle={contentAnimatedStyle}
			disabled={disabled}
			enableTrailingClose={enableTrailingClose}
			enableUnderlay={enableUnderlay}
			enableUnderlayActive={enableUnderlayActive}
			eventName={eventName}
			headlineTextAnimatedStyle={headlineTextAnimatedStyle}
			id={id}
			interactionHandlers={interactionHandlers}
			itemKey={itemKey}
			leadingElement={leading}
			onPrimaryAction={onPrimaryAction}
			ref={mergedRef}
			selectionType={selectionType}
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
