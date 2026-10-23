import type {ScrollView} from 'react-native'

import {useEffect, useId, useMemo, useRef, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {ListBaseProps, ListState} from './List.interface'

import {LAYOUT} from '../../constants'
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
	closeTrailing,
	defaultActiveKey,
	defaultActiveKeys,
	deselect,
	divider,
	enableUnderlay,
	enableUnderlayActive,
	focusedIndex,
	itemSize: rawItemSize,
	layoutType = LAYOUT.VERTICAL,
	loading,
	loadingElement,
	onActive: rawOnActive,
	onActives,
	onClose: rawOnClose,
	onConfirm,
	onItemStateEvent,
	onSecondaryAction,
	radius,
	ref,
	renderItem: rawRenderItem,
	selectType,
	shape,
	size = DENSITY_SIZE.MEDIUM,
	skeletonDuration = 0,
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
			pendingActivesEvent,
			pendingAfterAffordanceActiveEvent,
			pendingAfterAffordanceEvent,
			pendingCloseEvent
		},
		setState
	] = useImmer<ListState>({
		activeKey: rawActiveKey ?? defaultActiveKey,
		activeKeys: rawActiveKeys ?? defaultActiveKeys
	})

	usePendingEvent('pendingActiveEvent', rawOnActive, {pendingEvent: pendingActiveEvent, setState})
	usePendingEvent('pendingActivesEvent', onActives, {pendingEvent: pendingActivesEvent, setState})
	usePendingEvent('pendingAfterAffordanceActiveEvent', rawOnActive, {
		pendingEvent: pendingAfterAffordanceActiveEvent,
		setState
	})

	usePendingEvent('pendingCloseEvent', rawOnClose, {pendingEvent: pendingCloseEvent, setState})
	usePendingEvent('pendingAfterAffordanceEvent', onConfirm, {pendingEvent: pendingAfterAffordanceEvent, setState})

	const listRef = useRef<ScrollView>(null)
	const mergedRef = useMergeRefs([ref, listRef])
	const id = useId()
	const {token} = useTheme()
	const itemSize = rawItemSize ?? token.density.control[size]
	const onActive = useMemo(
		() => updateListActiveState(setState, {deselect, onActive: rawOnActive, onActives, selectType}),
		[deselect, onActives, rawOnActive, selectType, setState]
	)

	const onActiveAfterAffordance = useMemo(
		() => updateListAffordanceActiveState(setState, {onActive: rawOnActive, selectType}),
		[rawOnActive, selectType, setState]
	)

	const onClose = useMemo(() => triggerListClose(setState, rawOnClose), [rawOnClose, setState])
	const runUpdateActive = useMemo(
		() => updateListActiveState(setState, {deselect, selectType}),
		[deselect, selectType, setState]
	)

	const renderItem = useMemo(
		() =>
			createListItemRenderer({
				...onItemStateEvent,
				activeKey,
				activeKeys,
				afterAffordance,
				afterAffordanceActiveKey,
				beforeAffordance,
				closeTrailing,
				divider,
				enableUnderlay,
				enableUnderlayActive,
				focusedIndex,
				id,
				onActive,
				onActiveAfterAffordance,
				onSecondaryAction,
				radius,
				renderItem: rawRenderItem,
				selectType,
				shape,
				size,
				skeletonDuration: loading && !loadingElement ? -1 : skeletonDuration,
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
			closeTrailing,
			divider,
			enableUnderlay,
			enableUnderlayActive,
			focusedIndex,
			id,
			loading,
			loadingElement,
			onActive,
			onActiveAfterAffordance,
			onSecondaryAction,
			onItemStateEvent,
			radius,
			rawRenderItem,
			selectType,
			shape,
			size,
			skeletonDuration,
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
			layoutType={layoutType}
			loading={loading}
			loadingElement={loadingElement}
			onClose={onClose}
			ref={mergedRef}
			renderItem={renderItem}
			shape={shape}
		/>
	)
}
