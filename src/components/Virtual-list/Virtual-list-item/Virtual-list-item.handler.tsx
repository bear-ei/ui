import type {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTiming} from '../../../hooks'
import type {NativeDragEvent} from '../Virtual-list.interface'
import type {
	AnimateVirtualListItemTranslateOptions,
	HandleVirtualListItemDragEndOptions,
	HandleVirtualListItemDragStartOptions,
	VirtualListItemProps,
	VirtualListItemState
} from './Virtual-list-item.interface'

import {COMPONENT_STATUS} from '../../../constants'
import {ANIMATED_TIMING} from '../../../theme'
import {extractDragEventPayload} from '../extract-drag-event-payload.utils'

export const compareVirtualListItemProps = (prevProps: VirtualListItemProps, nextProps: VirtualListItemProps) => {
	const {
		containerLayout: prevContainerLayout,
		dependencies: prevDependencies,
		draggable: isPrevDraggable,
		gap: prevGap,
		item: prevItem,
		itemSize: prevItemSize,
		layoutType: prevLayoutType,
		onClose: prevOnClose,
		onDragEnd: prevOnDragEnd,
		onDragStart: prevOnDragStart,
		onDragUpdate: prevOnDragUpdate,
		onLoadEnd: prevOnLoadEnd,
		radius: prevRadius,
		renderItem: prevRenderItem,
		scrollOffset: prevScrollOffset,
		shape: prevShape
	} = prevProps

	const {
		containerLayout: nextContainerLayout,
		dependencies: nextDependencies,
		draggable: isNextDraggable,
		gap: nextGap,
		item: nextItem,
		itemSize: nextItemSize,
		layoutType: nextLayoutType,
		onClose: nextOnClose,
		onDragEnd: nextOnDragEnd,
		onDragStart: nextOnDragStart,
		onDragUpdate: nextOnDragUpdate,
		onLoadEnd: nextOnLoadEnd,
		radius: nextRadius,
		renderItem: nextRenderItem,
		scrollOffset: nextScrollOffset,
		shape: nextShape
	} = nextProps

	const isDependenciesChanged =
		prevDependencies?.length !== nextDependencies?.length ||
		prevDependencies?.some((dependence, index) => dependence !== nextDependencies?.[index])

	const isItemDependenciesChanged =
		prevItem.dependencies?.length !== nextItem.dependencies?.length ||
		prevItem.dependencies?.some((dependence, index) => dependence !== nextItem.dependencies?.[index])

	return ![
		isDependenciesChanged,
		isItemDependenciesChanged,
		prevContainerLayout?.width !== nextContainerLayout?.width,
		prevContainerLayout?.height !== nextContainerLayout?.height,
		isPrevDraggable !== isNextDraggable,
		prevGap !== nextGap,
		prevItem.index !== nextItem.index,
		prevItemSize !== nextItemSize,
		prevLayoutType !== nextLayoutType,
		prevOnClose !== nextOnClose,
		prevOnDragEnd !== nextOnDragEnd,
		prevOnDragStart !== nextOnDragStart,
		prevOnDragUpdate !== nextOnDragUpdate,
		prevOnLoadEnd !== nextOnLoadEnd,
		prevRadius !== nextRadius,
		prevRenderItem !== nextRenderItem,
		prevScrollOffset !== nextScrollOffset,
		prevShape !== nextShape
	].some(Boolean)
}

export const animateVirtualListItemTranslate = (
	sharedValue: SharedValue<number>,
	animatedTiming: AnimatedTiming,
	{onAnimationFinished}: AnimateVirtualListItemTranslateOptions
) => {
	const animateSharedValueTo = animatedTiming(sharedValue, {
		...ANIMATED_TIMING.STANDARD,
		callback: (finished?: boolean) => finished && onAnimationFinished?.()
	})

	return (offsetY: number) => animateSharedValueTo(offsetY)
}

export const animateVirtualListItemScale = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTiming) => {
	const animateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.STANDARD)

	return (dragging?: boolean) => {
		if (typeof dragging !== 'boolean') {
			return
		}

		animateSharedValueTo(dragging ? 1 : 0)
	}
}

export const updateVirtualListItemStatus = (setState: Updater<VirtualListItemState>) => () =>
	setState(draft => {
		if (draft.status === COMPONENT_STATUS.IDLE) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})

export const handleVirtualListItemDragUpdate =
	(indexKey: string, onDragUpdate?: (event: NativeDragEvent) => void) =>
	(event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
		if (!indexKey) {
			return
		}

		onDragUpdate?.({...event, indexKey})
	}

export const handleVirtualListItemAnimationFinished = (setState: Updater<VirtualListItemState>) => () =>
	setState(draft => {
		draft.zIndex = 0
	})

export const handleVirtualListItemDragStart =
	(indexKey: string, setState: Updater<VirtualListItemState>, {onDragStart}: HandleVirtualListItemDragStartOptions) =>
	(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) =>
		setState(draft => {
			draft.dragging = true
			draft.zIndex = 1024

			if (onDragStart) {
				draft.pendingDragStartEvent = {
					...extractDragEventPayload(event),
					indexKey
				}
			}
		})

export const handleVirtualListItemDragEnd =
	(
		indexKey: string,
		setState: Updater<VirtualListItemState>,
		{dragRef, onDragEnd}: HandleVirtualListItemDragEndOptions
	) =>
	(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
		setState(draft => {
			draft.dragging = false

			if (onDragEnd) {
				draft.pendingDragEndEvent = {
					...extractDragEventPayload(event),
					indexKey
				}
			}
		})

		dragRef.current?.reset()
	}

export const updateVirtualListItemIndex =
	(setState: Updater<VirtualListItemState>, dragging?: boolean) => (index: number) => {
		if (dragging) {
			return
		}

		setState(draft => {
			if (draft.index === index) {
				return
			}

			draft.index = index
		})
	}
