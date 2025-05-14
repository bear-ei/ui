import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef, type ForwardedRef} from 'react'
import type Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {createStableHandlerWithState, runAfterInteractions} from '../../utils'
import {ACTIVE_TRIGGER_EVEN_NAME} from './List.enum'
import {
	createListItemRenderer,
	createListItemSize,
	handleListActiveChange,
	handleListAffordanceActiveChange,
	handleListClose
} from './List.handler'
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
				nextAfterAffordanceEvent,
				nextCloseEvent
			},
			setState
		] = useImmer<ListState>({})

		const listRef = useRef<ForwardedRef<Animated.ScrollView>>(null)
		const id = useId()
		const theme = useTheme()
		const itemSize = createListItemSize({density, type})(theme)(rawItemSize)
		const onListActiveChang = useMemo(
			() =>
				createStableHandlerWithState(
					handleListActiveChange({onActive, selectType, onActives, deselect})
				)(setState)(),
			[deselect, onActive, onActives, selectType, setState]
		)

		const onListAffordanceActiveChange = useMemo(
			() =>
				createStableHandlerWithState(handleListAffordanceActiveChange({onActive, selectType}))(
					setState
				)(),
			[onActive, selectType, setState]
		)

		const onListClose = useMemo(
			() => createStableHandlerWithState(handleListClose(onClose))(setState)(),
			[onClose, setState]
		)

		const listActiveChangeEffect = useMemo(
			() => createStableHandlerWithState(handleListActiveChange({selectType}))(setState)(),
			[setState, selectType]
		)

		const renderListItem = useMemo(
			() =>
				createListItemRenderer({
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
					onActive: onListActiveChang,
					onActiveAfterAffordance: onListAffordanceActiveChange,
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
				onListActiveChang,
				onListAffordanceActiveChange,
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
			listActiveChangeEffect(rawActiveKey ?? defaultActiveKey ?? rawActiveKeys ?? defaultActiveKeys)
		}, [defaultActiveKey, defaultActiveKeys, listActiveChangeEffect, rawActiveKey, rawActiveKeys])

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
			runAfterInteractions(nextAfterAffordanceEvent)()
		}, [nextAfterAffordanceEvent])

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
