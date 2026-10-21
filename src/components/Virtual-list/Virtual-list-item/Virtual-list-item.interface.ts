import type {RefAttributes} from 'react'
import type {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import type {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus} from '../../../constants'
import type {AnimatedTimingOptions, AnimateSharedValueTo} from '../../../hooks'
import type {DragRef} from '../../Drag'
import type {NativeDragEvent, Item, RenderVirtualListProps} from '../Virtual-list.interface'

export interface VirtualListItemProps<T = Record<string, unknown>>
	extends
		ViewProps,
		RefAttributes<View>,
		Pick<
			RenderVirtualListProps<T>,
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
	item?: T & Item
	onDragEnd?: (event: NativeDragEvent) => void
	onDragStart?: (event: NativeDragEvent) => void
	onDragUpdate?: (event: NativeDragEvent) => void
	onClose?: (indexKey?: string) => void
	scrollOffset?: number
}

export interface RenderVirtualListItemProps<T = Record<string, unknown>> extends Omit<
	VirtualListItemProps<T>,
	'onUnmount' | 'onDragUpdate' | 'onDragEnd' | 'onDragStart'
> {
	containerAnimatedStyle?: AnimatedStyle<ViewStyle>
	dragging?: boolean
	dragOffset?: number
	dragRef?: React.RefObject<DragRef | null>
	itemElement?: React.JSX.Element
	offset?: number
	onDragEnd?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
	onDragStart?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
	onDragUpdate?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void
	onClose?: () => void
	zIndex?: number
}

export type VirtualListItemBaseProps<T = Record<string, unknown>> = VirtualListItemProps<T>
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
	indexKey?: string
	dragRef: React.RefObject<DragRef | null>
}

export interface HandleVirtualListItemDragStartOptions extends Pick<VirtualListItemProps, 'onDragStart'> {
	indexKey?: string
}

export interface AnimateVirtualListItemTranslateOptions extends Pick<
	UseVirtualListItemAnimatedOptions,
	'onAnimationFinished'
> {
	animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo
}
