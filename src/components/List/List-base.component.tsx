import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef, type ForwardedRef} from 'react'
import type Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../utils'
import {ACTIVE_TRIGGER_EVEN_NAME} from './List.enum'
import {
	createListItemRenderer,
	createListItemSize,
	triggerListClose,
	updateListActiveState,
	updateListAffordanceActiveState
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
			onActive: rawOnActive,
			onActives,
			onCancel,
			onClose: rawOnClose,
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
		const onActive = useMemo(
			() => updateListActiveState({onActive: rawOnActive, selectType, onActives, deselect})(setState),
			[deselect, onActives, rawOnActive, selectType, setState]
		)

		const onActiveAfterAffordance = useMemo(
			() => updateListAffordanceActiveState({onActive: rawOnActive, selectType})(setState),
			[rawOnActive, selectType, setState]
		)

		const onClose = useMemo(() => triggerListClose(rawOnClose)(setState), [rawOnClose, setState])
		const runUpdateListActiveState = useMemo(
			() => updateListActiveState({selectType})(setState),
			[selectType, setState]
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
					onActive,
					onActiveAfterAffordance,
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
				onActive,
				onActiveAfterAffordance,
				onCancel,
				onConfirm,
				onItemStateEvent,
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
			runUpdateListActiveState(rawActiveKey ?? defaultActiveKey ?? rawActiveKeys ?? defaultActiveKeys)
		}, [defaultActiveKey, defaultActiveKeys, rawActiveKey, rawActiveKeys, runUpdateListActiveState])

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
			onClose,
			ref: listRef as ForwardedRef<Animated.ScrollView>,
			renderItem: renderListItem
		})
	}
)
