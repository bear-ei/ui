import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../utils'
import {
	handleListActive,
	handleListActiveAfterAffordance,
	handleListClose,
	handleListItemSize,
	handleRenderListItem
} from './List-handle'
import type {ListBaseProps, ListData, ListState, RenderListProps, VirtualListComponent} from './List.interface'

export const ListBase = forwardRef<VirtualListComponent<ListData>, ListBaseProps>(
	(
		{
			activeKey: rawActiveKey,
			activeKeys: rawActiveKeys,
			activeTriggerEvenName = 'pressOut',
			afterAffordance,
			afterAffordancePrimaryButtonProps,
			afterAffordanceSecondaryButtonProps,
			beforeAffordance,
			closeTrailing,
			defaultActiveKey,
			defaultActiveKeys,
			density,
			deselect,
			divider,
			enableUnderlay,
			enableUnderlayActive,
			focusedIndex,
			itemSize,
			loading,
			loadingComponent,
			onActive,
			onActives,
			onCancel,
			onClose,
			onConfirm,
			onItemStateEvent,
			renderItem,
			renderList,
			selectType,
			shape,
			skeletonDuration = 0,
			skeletonElement,
			supportingTextNumberOfLines,
			testID,
			trailingTriggerEvenName,
			type,
			...renderListProps
		},
		ref
	) => {
		const [
			{
				activeKey,
				activeKeys,
				afterAffordanceActiveKey,
				nextActiveEvent,
				nextAfterAffordanceActiveEvent,
				nextAfterAffordanceCallbackEvent,
				nextCloseEvent
			},
			setState
		] = useImmer<ListState>({})

		const listRef = useRef<VirtualListComponent<ListData>>(null)
		const id = useId()
		const theme = useTheme()
		const onListActive = handleListActive({onActive, selectType, onActives, deselect})(setState)
		const onListActiveAfterAffordance = handleListActiveAfterAffordance({onActive, selectType})(setState)
		const onListClose = handleListClose(onClose)(setState)
		const onListRawActive = useMemo(() => handleListActive({selectType})(setState), [setState, selectType])
		const renderListItem = handleRenderListItem({
			...onItemStateEvent,
			activeKey: activeKey ?? defaultActiveKey,
			activeKeys: activeKeys ?? defaultActiveKeys,
			activeTriggerEvenName,
			afterAffordance,
			afterAffordanceActiveKey,
			afterAffordancePrimaryButtonProps,
			afterAffordanceSecondaryButtonProps,
			beforeAffordance,
			closeTrailing,
			density,
			divider,
			enableUnderlay,
			enableUnderlayActive,
			focusedIndex,
			onActive: onListActive,
			onActiveAfterAffordance: onListActiveAfterAffordance,
			onCancel,
			onConfirm,
			renderItem,
			selectType,
			shape,
			skeletonDuration: loading && !loadingComponent ? -1 : skeletonDuration,
			skeletonElement,
			supportingTextNumberOfLines,
			trailingTriggerEvenName,
			type
		})

		useImperativeHandle(ref, () => (listRef?.current ?? {}) as VirtualListComponent<ListData>, [listRef])

		useEffect(() => {
			onListRawActive(rawActiveKey ?? defaultActiveKey ?? rawActiveKeys ?? defaultActiveKeys)
		}, [rawActiveKey, rawActiveKeys, defaultActiveKey, defaultActiveKeys, onListRawActive])

		useEffect(() => {
			runAfterInteractions(nextActiveEvent)()
		}, [nextActiveEvent])

		useEffect(() => {
			runAfterInteractions(nextAfterAffordanceActiveEvent)()
		}, [nextAfterAffordanceActiveEvent])

		useEffect(() => {
			runAfterInteractions(nextCloseEvent)()
		}, [nextCloseEvent])

		useEffect(() => {
			runAfterInteractions(nextAfterAffordanceCallbackEvent)()
		}, [nextAfterAffordanceCallbackEvent])

		return renderList({
			...renderListProps,
			activeKey,
			activeKeys,
			afterAffordanceActiveKey,
			focusedIndex,
			id,
			itemSize: handleListItemSize({density, type})(theme)(itemSize),
			loading,
			loadingComponent,
			onClose: onListClose,
			ref: listRef as RenderListProps['ref'],
			renderItem: renderListItem,
			testID: testID ?? id
		})
	}
)
