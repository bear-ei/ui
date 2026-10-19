import type {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {COMPONENT_STATUS} from '../../../constants'
import type {AnimatedTimingOptions, AnimateSharedValueTo} from '../../../hooks'
import {DURATION, EASING} from '../../../theme'
import {extractDragEventPayload} from '../extract-drag-event-payload.utils'
import type {NativeDragEvent} from '../Virtual-list.interface'
import type {
	AnimateVirtualListItemTranslateOptions,
	HandleVirtualListItemDragEndOptions,
	HandleVirtualListItemDragStartOptions,
	VirtualListItemProps,
	VirtualListItemState
} from './Virtual-list-item.interface'

export const compareVirtualListItemProps = (prevProps: VirtualListItemProps) => {
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

	return (nextProps: VirtualListItemProps) => {
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
			prevItem?.dependencies?.length !== nextItem?.dependencies?.length ||
			prevItem?.dependencies?.some((dependence, index) => dependence !== nextItem?.dependencies?.[index])

		return ![
			isDependenciesChanged,
			isItemDependenciesChanged,
			prevContainerLayout?.width !== nextContainerLayout?.width,
			prevContainerLayout?.height !== nextContainerLayout?.height,
			isPrevDraggable !== isNextDraggable,
			prevGap !== nextGap,
			prevItem?.index !== nextItem?.index,
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
}

export const triggerVirtualListItemClose = (onClose?: (indexKey?: string) => void) => (indexKey?: string) => () =>
	indexKey && onClose?.(indexKey)

export const animateVirtualListItemTranslate =
	({animatedTiming, onAnimationFinished}: AnimateVirtualListItemTranslateOptions) =>
	(translateSharedValue: SharedValue<number>) => {
		const animateSharedValueTo = animatedTiming({
			callback: (finished?: boolean) => finished && onAnimationFinished?.(),
			duration: DURATION.SHORT_2,
			easing: EASING.STANDARD
		})({sharedValue: translateSharedValue})

		return (offsetY: number) => animateSharedValueTo(offsetY)
	}

export const animateVirtualListItemScale =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	(scaleSharedValue: SharedValue<number>) => {
		const animateSharedValueTo = animatedTiming({
			duration: DURATION.SHORT_2,
			easing: EASING.STANDARD
		})({sharedValue: scaleSharedValue})

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
	(onDragUpdate?: (event: NativeDragEvent) => void) =>
	(indexKey?: string) =>
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
	({indexKey, onDragStart}: HandleVirtualListItemDragStartOptions) =>
	(setState: Updater<VirtualListItemState>) =>
	(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
		if (!indexKey) {
			return
		}

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
	}

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
				draft.pendingDragEndEvent = {
					...extractDragEventPayload(event),
					indexKey
				}
			}
		})

		dragRef.current?.reset()
	}

export const updateVirtualListItemIndex =
	(dragging?: boolean) => (setState: Updater<VirtualListItemState>) => (index: number) => {
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
