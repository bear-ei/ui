import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef, type ForwardedRef} from 'react'
import type Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {createStableHandlerWithState, runAfterInteractions} from '../../utils'
import {
	createItemRenderer,
	createItemSize,
	handleAffordanceActiveChange,
	handleItemActiveChange,
	handleItemClose
} from './List-handler'
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
				nextAfterAffordanceEvent,
				nextCloseEvent
			},
			setState
		] = useImmer<ListState>({})

		const listRef = useRef<ForwardedRef<Animated.ScrollView>>(null)
		const id = useId()
		const theme = useTheme()
		const itemSize = createItemSize({density, type})(theme)(rawItemSize)
		const onItemActiveChange = useMemo(
			() =>
				createStableHandlerWithState(
					handleItemActiveChange({onActive, selectType, onActives, deselect})
				)(setState)(),
			[deselect, onActive, onActives, selectType, setState]
		)

		const onAffordanceActiveChange = useMemo(
			() =>
				createStableHandlerWithState(handleAffordanceActiveChange({onActive, selectType}))(
					setState
				)(),
			[onActive, selectType, setState]
		)

		const onItemClose = useMemo(
			() => createStableHandlerWithState(handleItemClose(onClose))(setState)(),
			[onClose, setState]
		)

		const itemActiveChangeEffect = useMemo(
			() => createStableHandlerWithState(handleItemActiveChange({selectType}))(setState)(),
			[setState, selectType]
		)

		const renderListItem = useMemo(
			() =>
				createItemRenderer({
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
					onActive: onItemActiveChange,
					onActiveAfterAffordance: onAffordanceActiveChange,
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
				onAffordanceActiveChange,
				onCancel,
				onConfirm,
				onItemActiveChange,
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
			itemActiveChangeEffect(rawActiveKey ?? defaultActiveKey ?? rawActiveKeys ?? defaultActiveKeys)
		}, [defaultActiveKey, defaultActiveKeys, itemActiveChangeEffect, rawActiveKey, rawActiveKeys])

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
			onClose: onItemClose,
			ref: listRef as ForwardedRef<Animated.ScrollView>,
			renderItem: renderListItem
		})
	}
)
