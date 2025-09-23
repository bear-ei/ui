import type {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimateSharedValueTo} from '../../../hooks'
import {COMPONENT_STATUS} from '../../Common'
import type {HandleDragUpdateOptions} from '../Virtual-list.interface'
import type {
	HandleVirtualListItemDragEndOptions,
	VirtualListItemProps,
	VirtualListItemState
} from './Virtual-list-item.interface'

export const compareVirtualListItemProps = (prevProps: VirtualListItemProps) => {
	const {dependencies: prevDependencies, item: prevItem, containerLayout: prevContainerLayout} = prevProps

	return (nextProps: VirtualListItemProps) => {
		const {dependencies: nextDependencies, item: nextItem, containerLayout: nextContainerLayout} = nextProps
		const isDependenciesChanged =
			prevDependencies?.length !== nextDependencies?.length ||
			prevDependencies?.some((dependence, index) => dependence !== nextDependencies?.[index])

		const isItemDependenciesChanged =
			prevItem?.dependencies?.length !== nextItem?.dependencies?.length ||
			prevItem?.dependencies?.some(
				(dependence, index) => dependence !== nextItem?.dependencies?.[index]
			)

		return ![
			isDependenciesChanged,
			isItemDependenciesChanged,
			JSON.stringify(prevContainerLayout) !== JSON.stringify(nextContainerLayout),
			prevItem?.index !== nextItem?.index
		].some(Boolean)
	}
}

export const triggerVirtualListItemClose = (setState: Updater<VirtualListItemState>) => () =>
	setState(draft => {
		draft.visible = false
	})

export const triggerVirtualListItemUnmount = (onUnmount?: (indexKey?: string) => void) => (indexKey?: string) => () =>
	indexKey && onUnmount?.(indexKey)

export const animateVirtualListItem =
	(animateSharedValueTo: AnimateSharedValueTo) => (topSharedValue: SharedValue<number>) => (offsetY: number) =>
		animateSharedValueTo({sharedValue: topSharedValue})(offsetY)

export const updateVirtualListItemStatus = (setState: Updater<VirtualListItemState>) => () =>
	setState(draft => {
		if (draft.status === COMPONENT_STATUS.IDLE) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})

export const handleVirtualListItemDragUpdate =
	(onDragUpdate?: (options: HandleDragUpdateOptions) => void) =>
	(indexKey?: string) =>
	(event: GestureUpdateEvent<PanGestureHandlerEventPayload>) =>
		indexKey && onDragUpdate?.({indexKey, event})

export const handleVirtualListItemDragStart =
	(setState: Updater<VirtualListItemState>) => (_event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) =>
		setState(draft => {
			draft.dragging = true
		})

export const handleVirtualListItemDragEnd =
	({onDragEnd, indexKey}: HandleVirtualListItemDragEndOptions) =>
	(setState: Updater<VirtualListItemState>) =>
	(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
		if (!indexKey) {
			return
		}

		const nextDragEndEvent = () => onDragEnd?.({indexKey, event})

		setState(draft => {
			draft.dragging = false
			draft.nextDragEndEvent = nextDragEndEvent
		})
	}
