import type {RefAttributes} from 'react'
import type {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import type {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus} from '../../../constants'
import type {DragRef} from '../../Drag'
import type {Item, NativeDragEvent, VirtualListProps} from '../Virtual-list.interface'

export interface VirtualListItemProps
	extends
		ViewProps,
		RefAttributes<View>,
		Pick<
			VirtualListProps,
			| 'dependencies'
			| 'draggable'
			| 'gap'
			| 'itemSize'
			| 'layoutType'
			| 'onLoadEnd'
			| 'radius'
			| 'renderItem'
			| 'shape'
		> {
	containerLayout?: Partial<LayoutRectangle>
	item: Item
	onClose?: (indexKey: string) => void
	onDragEnd?: (event: NativeDragEvent) => void
	onDragStart?: (event: NativeDragEvent) => void
	onDragUpdate?: (event: NativeDragEvent) => void
	scrollOffset?: number
}

export interface RenderVirtualListItemProps extends Omit<
	VirtualListItemProps,
	'onUnmount' | 'onDragUpdate' | 'onDragEnd' | 'onDragStart' | 'item'
> {
	containerAnimatedStyle?: AnimatedStyle<ViewStyle>
	dragging?: boolean
	dragOffset?: number
	dragRef?: React.RefObject<DragRef | null>
	itemElement?: React.JSX.Element
	offset?: number
	onClose?: () => void
	onDragEnd?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
	onDragStart?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
	onDragUpdate?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void
	zIndex?: number
}

export type VirtualListItemBaseProps = VirtualListItemProps
export interface VirtualListItemState {
	dragging?: boolean
	index?: number
	pendingDragEndEvent?: NativeDragEvent
	pendingDragStartEvent?: NativeDragEvent
	status: ComponentStatus
	zIndex: number
}

export interface UseVirtualListItemAnimatedOptions extends Pick<VirtualListItemProps, 'layoutType'> {
	dragging?: boolean
	offset?: number
	onAnimationFinished?: (visible?: boolean) => void
	status: ComponentStatus
}

export interface HandleVirtualListItemDragEndOptions extends Pick<VirtualListItemProps, 'onDragEnd'> {
	dragRef: React.RefObject<DragRef | null>
}

export type HandleVirtualListItemDragStartOptions = Pick<VirtualListItemProps, 'onDragStart'>
export type AnimateVirtualListItemTranslateOptions = Pick<UseVirtualListItemAnimatedOptions, 'onAnimationFinished'>
