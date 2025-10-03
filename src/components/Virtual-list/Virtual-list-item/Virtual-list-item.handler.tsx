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
	HandleVirtualListItemDragStartOptions,
	VirtualListItemProps,
	VirtualListItemState
} from './Virtual-list-item.interface'

export const compareVirtualListItemProps = (prevProps: VirtualListItemProps) => {
	const {
		containerLayout: prevContainerLayout,
		dependencies: prevDependencies,
		item: prevItem,
		scrollOffset: prevScrollOffset
	} = prevProps

	return (nextProps: VirtualListItemProps) => {
		const {
			containerLayout: nextContainerLayout,
			dependencies: nextDependencies,
			item: nextItem,
			scrollOffset: nextScrollOffset
		} = nextProps

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
			prevItem?.index !== nextItem?.index,
			prevScrollOffset !== nextScrollOffset
		].some(Boolean)
	}
}

export const triggerVirtualListItemClose = (setState: Updater<VirtualListItemState>) => () =>
	setState(draft => {
		draft.visible = false
	})

export const triggerVirtualListItemUnmount = (onUnmount?: (indexKey?: string) => void) => (indexKey?: string) => () =>
	indexKey && onUnmount?.(indexKey)

export const animateVirtualListItemTranslate =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	(translateSharedValue: SharedValue<number>) =>
	(offsetY: number) =>
		animateSharedValueTo({sharedValue: translateSharedValue})(offsetY)

export const animateVirtualListItemScale =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	(scaleSharedValue: SharedValue<number>) =>
	(dragging?: boolean) =>
		typeof dragging === 'boolean' && animateSharedValueTo({sharedValue: scaleSharedValue})(dragging ? 1 : 0)

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

export const handleVirtualListItemAnimationFinished = (setState: Updater<VirtualListItemState>) => () =>
	setState(draft => {
		draft.zIndex = 0
	})

export const handleVirtualListItemDragStart =
	({indexKey, onDragStart}: HandleVirtualListItemDragStartOptions) =>
	(setState: Updater<VirtualListItemState>) =>
	(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) =>
		indexKey &&
		setState(draft => {
			draft.dragging = true
			draft.zIndex = 1024

			if (onDragStart) {
				draft.nextDragStartEvent = () => onDragStart?.({indexKey, event})
			}
		})

export const handleVirtualListItemDragEnd =
	({onDragEnd, indexKey, dragRef}: HandleVirtualListItemDragEndOptions) =>
	(setState: Updater<VirtualListItemState>) =>
	(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
		if (!indexKey) {
			return
		}

		setState(draft => {
			draft.dragging = false

			if (onDragEnd) {
				draft.nextDragEndEvent = () => onDragEnd?.({indexKey, event})
			}
		})

		dragRef.current?.reset()
	}

export const updateVirtualListItemIndex =
	(dragging?: boolean) => (setState: Updater<VirtualListItemState>) => (index: number) =>
		!dragging &&
		setState(draft => {
			draft.index = index
		})
