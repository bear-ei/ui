import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef, type ForwardedRef} from 'react'
import type Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {createHandler, runAfterInteractions} from '../../utils'
import {
	createListItemSize,
	createRenderListItem,
	handleListActive,
	handleListActiveAfterAffordance,
	handleListClose
} from './List-handle'
import {ACTIVE_TRIGGER_EVEN_NAME} from './List.enum'
import type {ListBaseProps, ListData, ListState, VirtualListComponent} from './List.interface'

export const ListBase = forwardRef<VirtualListComponent<ListData>, ListBaseProps>(
	(
		{
			activeKey: rawActiveKey,
			activeKeys: rawActiveKeys,
			activeTriggerEvenName = ACTIVE_TRIGGER_EVEN_NAME.PRESS_OUT,
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
			itemSize: rawItemSize,
			loading,
			loadingElement,
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

		const listRef = useRef<ForwardedRef<Animated.ScrollView>>(null)
		const id = useId()
		const theme = useTheme()
		const itemSize = createListItemSize({density, type})(theme)(rawItemSize)
		const onListActive = useMemo(
			() => createHandler(handleListActive({onActive, selectType, onActives, deselect}))(setState)(),
			[deselect, onActive, onActives, selectType, setState]
		)

		const onListActiveAfterAffordance = useMemo(
			() => createHandler(handleListActiveAfterAffordance({onActive, selectType}))(setState)(),
			[onActive, selectType, setState]
		)

		const onListClose = useMemo(
			() => createHandler(handleListClose(onClose))(setState)(),
			[onClose, setState]
		)

		const onListRawActive = useMemo(
			() => createHandler(handleListActive({selectType}))(setState)(),
			[setState, selectType]
		)

		const renderListItem = useMemo(
			() =>
				createRenderListItem({
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
					id,
					onActive: onListActive,
					onActiveAfterAffordance: onListActiveAfterAffordance,
					onCancel,
					onConfirm,
					renderItem,
					selectType,
					shape,
					skeletonDuration: loading && !loadingElement ? -1 : skeletonDuration,
					skeletonElement,
					supportingTextNumberOfLines,
					trailingTriggerEvenName,
					type
				}),
			[
				activeKey,
				activeKeys,
				activeTriggerEvenName,
				afterAffordance,
				afterAffordanceActiveKey,
				afterAffordancePrimaryButtonProps,
				afterAffordanceSecondaryButtonProps,
				beforeAffordance,
				closeTrailing,
				defaultActiveKey,
				defaultActiveKeys,
				density,
				divider,
				enableUnderlay,
				enableUnderlayActive,
				focusedIndex,
				id,
				loading,
				loadingElement,
				onCancel,
				onConfirm,
				onItemStateEvent,
				onListActive,
				onListActiveAfterAffordance,
				renderItem,
				selectType,
				shape,
				skeletonDuration,
				skeletonElement,
				supportingTextNumberOfLines,
				trailingTriggerEvenName,
				type
			]
		)

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
			itemSize,
			loading,
			loadingElement,
			onClose: onListClose,
			ref: listRef as ForwardedRef<Animated.ScrollView>,
			renderItem: renderListItem
		})
	}
)
