import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {ScrollView} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../utils'
import {ACTIVE_TRIGGER_EVEN_NAME, LIST_TYPE} from './List.enum'
import {
	createListItemRenderer,
	createListItemSize,
	triggerListClose,
	updateListActiveState,
	updateListAffordanceActiveState
} from './List.handler'
import type {ListBaseProps, ListState} from './List.interface'
import {RenderList} from './List.render'

export const ListBase = forwardRef<ScrollView, ListBaseProps>(
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
			renderItem: rawRenderItem,
			selectType,
			shape,
			skeletonDuration = 0,
			skeletonElement,
			supportingTextNumberOfLines,
			trailingTriggerEvenName,
			type = LIST_TYPE.STANDARD,
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

		const listRef = useRef<ScrollView>(null)
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
		const runUpdateActiveState = useMemo(
			() => updateListActiveState({selectType})(setState),
			[selectType, setState]
		)

		const renderItem = useMemo(
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
					renderItem: rawRenderItem,
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
				rawRenderItem,
				selectType,
				shape,
				skeletonDuration,
				skeletonElement,
				supportingTextNumberOfLines,
				trailingTriggerEvenName,
				type
			]
		)

		useImperativeHandle(ref, () => (listRef?.current ?? {}) as ScrollView, [listRef])

		useEffect(() => {
			runUpdateActiveState(rawActiveKey ?? defaultActiveKey ?? rawActiveKeys ?? defaultActiveKeys)
		}, [defaultActiveKey, defaultActiveKeys, rawActiveKey, rawActiveKeys, runUpdateActiveState])

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
				ref={listRef}
				renderItem={renderItem}
			/>
		)
	}
)
