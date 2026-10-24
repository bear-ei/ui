import type {ScrollView} from 'react-native'

import {useEffect, useId, useMemo, useRef, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {ListBaseProps, ListState} from './List.interface'

import {ORIENTATION} from '../../constants'
import {useMergeRefs, usePendingEvent, useTheme} from '../../hooks'
import {DENSITY_SIZE} from '../../theme'
import {LIST_TYPE} from './List.enum'
import {
	createListItemRenderer,
	triggerListClose,
	updateListActiveState,
	updateListAffordanceActiveState
} from './List.handler'
import {RenderList} from './List.render'

export const ListBase: FC<ListBaseProps> = ({
	activeKey: rawActiveKey,
	activeKeys: rawActiveKeys,
	afterAffordance,
	beforeAffordance,
	defaultActiveKey,
	defaultActiveKeys,
	deselectable,
	divider,
	enableTrailingClose,
	enableUnderlay,
	enableUnderlayActive,
	focusedIndex,
	itemInteractionHandlers,
	itemSize: rawItemSize,
	loading,
	loadingElement,
	onActiveKeyChange: rawOnActiveKeyChange,
	onActiveKeysChange,
	onAfterAffordanceActiveChange: rawOnAfterAffordanceActiveChange,
	onClose: rawOnClose,
	onPrimaryAction,
	onSecondaryPress,
	orientation = ORIENTATION.VERTICAL,
	radius,
	ref,
	renderItem: rawRenderItem,
	selectionType,
	shape,
	size = DENSITY_SIZE.MEDIUM,
	skeletonAutoHideDelay = 0,
	skeletonElement,
	supportingTextNumberOfLines,
	trailingTriggerOn,
	type = LIST_TYPE.STANDARD,
	...renderListProps
}) => {
	const [
		{
			activeKey,
			activeKeys,
			afterAffordanceActiveKey,
			pendingActiveEvent,
			pendingActiveKeysEvent,
			pendingAfterAffordanceActiveEvent,
			pendingAfterAffordancePrimaryActionEvent,
			pendingCloseEvent
		},
		setState
	] = useImmer<ListState>({
		activeKey: rawActiveKey ?? defaultActiveKey,
		activeKeys: rawActiveKeys ?? defaultActiveKeys
	})

	usePendingEvent('pendingActiveEvent', rawOnActiveKeyChange, {pendingEvent: pendingActiveEvent, setState})
	usePendingEvent('pendingActiveKeysEvent', onActiveKeysChange, {pendingEvent: pendingActiveKeysEvent, setState})
	usePendingEvent(
		'pendingAfterAffordanceActiveEvent',
		(changedKey?: string) => {
			if (changedKey === undefined) {
				return
			}

			rawOnActiveKeyChange?.(changedKey)
			rawOnAfterAffordanceActiveChange?.({activeKey: changedKey})
		},
		{pendingEvent: pendingAfterAffordanceActiveEvent, setState}
	)

	usePendingEvent('pendingCloseEvent', rawOnClose, {pendingEvent: pendingCloseEvent, setState})
	usePendingEvent('pendingAfterAffordancePrimaryActionEvent', onPrimaryAction, {
		pendingEvent: pendingAfterAffordancePrimaryActionEvent,
		setState
	})

	const listRef = useRef<ScrollView>(null)
	const mergedRef = useMergeRefs([ref, listRef])
	const id = useId()
	const {token} = useTheme()
	const itemSize = rawItemSize ?? token.density.control[size]
	const onActiveKeyChange = useMemo(
		() =>
			updateListActiveState(setState, {
				deselectable,
				onActiveKeyChange: rawOnActiveKeyChange,
				onActiveKeysChange,
				selectionType
			}),
		[deselectable, onActiveKeysChange, rawOnActiveKeyChange, selectionType, setState]
	)

	const handleAfterAffordanceActiveChange = useMemo(
		() =>
			updateListAffordanceActiveState(setState, {
				onActiveKeyChange: rawOnActiveKeyChange,
				onAfterAffordanceActiveChange: rawOnAfterAffordanceActiveChange,
				selectionType
			}),
		[rawOnActiveKeyChange, rawOnAfterAffordanceActiveChange, selectionType, setState]
	)

	const onClose = useMemo(() => triggerListClose(setState, rawOnClose), [rawOnClose, setState])
	const runUpdateActive = useMemo(
		() => updateListActiveState(setState, {deselectable, selectionType}),
		[deselectable, selectionType, setState]
	)

	const renderItem = useMemo(
		() =>
			createListItemRenderer({
				...itemInteractionHandlers,
				activeKey,
				activeKeys,
				afterAffordance,
				afterAffordanceActiveKey,
				beforeAffordance,
				divider,
				enableTrailingClose,
				enableUnderlay,
				enableUnderlayActive,
				focusedIndex,
				id,
				onActiveKeyChange,
				onAfterAffordanceActiveChange: handleAfterAffordanceActiveChange,
				onSecondaryPress,
				radius,
				renderItem: rawRenderItem,
				selectionType,
				shape,
				size,
				skeletonAutoHideDelay: loading && !loadingElement ? -1 : skeletonAutoHideDelay,
				skeletonElement,
				supportingTextNumberOfLines,
				trailingTriggerOn,
				type
			}),
		[
			activeKey,
			activeKeys,
			afterAffordance,
			afterAffordanceActiveKey,
			beforeAffordance,
			enableTrailingClose,
			divider,
			enableUnderlay,
			enableUnderlayActive,
			focusedIndex,
			id,
			loading,
			loadingElement,
			onActiveKeyChange,
			handleAfterAffordanceActiveChange,
			onSecondaryPress,
			itemInteractionHandlers,
			radius,
			rawRenderItem,
			selectionType,
			shape,
			size,
			skeletonAutoHideDelay,
			skeletonElement,
			supportingTextNumberOfLines,
			trailingTriggerOn,
			type
		]
	)

	useEffect(() => {
		runUpdateActive(rawActiveKey ?? rawActiveKeys)
	}, [rawActiveKey, rawActiveKeys, runUpdateActive])

	return (
		<RenderList
			{...renderListProps}
			activeKey={activeKey}
			activeKeys={activeKeys}
			afterAffordanceActiveKey={afterAffordanceActiveKey}
			focusedIndex={focusedIndex}
			id={id}
			itemSize={itemSize}
			loading={loading}
			loadingElement={loadingElement}
			onClose={onClose}
			orientation={orientation}
			ref={mergedRef}
			renderItem={renderItem}
			shape={shape}
		/>
	)
}
