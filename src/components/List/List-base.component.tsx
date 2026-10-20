import {forwardRef, useEffect, useId, useMemo, useRef} from 'react'
import type {ScrollView} from 'react-native'
import {useImmer} from 'use-immer'
import {LAYOUT} from '../../constants'
import {useMergeRefs, usePendingEvent, useTheme} from '../../hooks'
import {LIST_TYPE} from './List.enum'
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
			onCancel,
			onClose: rawOnClose,
			onConfirm,
			onItemStateEvent,
			renderItem: rawRenderItem,
			selectType,
			radius,
			shape,
			size,
			skeletonDuration = 0,
			skeletonElement,
			supportingTextNumberOfLines,
			trailingTriggerOn,
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
				pendingActiveEvent,
				pendingAfterAffordanceActiveEvent,
				pendingAfterAffordanceEvent,
				pendingCloseEvent
			},
			setState
		] = useImmer<ListState>({
			activeKey: rawActiveKey ?? defaultActiveKey,
			activeKeys: rawActiveKeys ?? defaultActiveKeys
		})

		usePendingEvent({
			eventKey: 'pendingActiveEvent',
			func: rawOnActive,
			pendingEvent: pendingActiveEvent as string,
			setState
		})

		usePendingEvent({
			eventKey: 'pendingAfterAffordanceActiveEvent',
			func: rawOnActive,
			pendingEvent: pendingAfterAffordanceActiveEvent,
			setState
		})

		usePendingEvent({
			eventKey: 'pendingCloseEvent',
			func: rawOnClose,
			pendingEvent: pendingCloseEvent,
			setState
		})

		usePendingEvent({
			eventKey: 'pendingAfterAffordanceEvent',
			func: onConfirm,
			pendingEvent: pendingAfterAffordanceEvent,
			setState
		})

		const listRef = useRef<ScrollView>(null)
		const mergedRef = useMergeRefs([ref, listRef])
		const id = useId()
		const {token} = useTheme()
		const itemSize = createListItemSize(size)(token)(rawItemSize)
		const onActive = useMemo(
			() => updateListActiveState({onActive: rawOnActive, selectType, onActives, deselect})(setState),
			[deselect, onActives, rawOnActive, selectType, setState]
		)

		const onActiveAfterAffordance = useMemo(
			() => updateListAffordanceActiveState({onActive: rawOnActive, selectType})(setState),
			[rawOnActive, selectType, setState]
		)

		const onClose = useMemo(() => triggerListClose(rawOnClose)(setState), [rawOnClose, setState])
		const runUpdateActive = onActive
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
					onCancel,
					onConfirm,
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
				onCancel,
				onConfirm,
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
)

ListBase.displayName = 'ListBase'
