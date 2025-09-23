import type {RefAttributes} from 'react'
import type {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import type {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {ComponentStatus} from '../../Common'
import type {ListAffordanceButtonProps} from '../../List/List-affordance-button'
import type {HandleDragEndOptions, HandleDragUpdateOptions, RenderVirtualListProps} from '../Virtual-list.interface'

export interface Item {
	afterAffordanceSecondaryButtonProps?: ListAffordanceButtonProps
	dependencies?: string[]
	index?: number
	indexKey?: string
}

export interface RenderVirtualListItemInfo<T> {
	item: T & Item
}

export interface VirtualListItemProps<T = Record<string, unknown>>
	extends ViewProps,
		RefAttributes<View>,
		Pick<
			RenderVirtualListProps<T>,
			| 'dependencies'
			| 'draggable'
			| 'gap'
			| 'itemSize'
			| 'layout'
			| 'onLoadEnd'
			| 'renderItem'
			| 'shape'
		> {
	containerLayout?: LayoutRectangle
	index?: number
	item?: T & Item
	loading?: boolean
	onDragEnd?: (options: HandleDragEndOptions) => void
	onDragUpdate?: (options: HandleDragUpdateOptions) => void
	onUnmount?: (indexKey?: string) => void
}

export interface RenderVirtualListItemProps<T = Record<string, unknown>>
	extends Omit<VirtualListItemProps<T>, 'onUnmount' | 'onDragUpdate' | 'onDragEnd'> {
	containerAnimatedStyle?: AnimatedStyle<ViewStyle>
	dragging?: boolean
	itemElement?: React.JSX.Element
	onDragEnd?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
	onDragStart?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
	onDragUpdate?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void
	onUnmount?: () => void
	unmount?: boolean
	visible?: boolean
}

export type VirtualListItemBaseProps<T = Record<string, unknown>> = VirtualListItemProps<T>
export interface VirtualListItemState {
	dragging?: boolean
	nextDragEndEvent?: () => void
	status: ComponentStatus
	visible?: boolean
}

export interface UseVirtualListItemAnimatedOptions extends Pick<VirtualListItemProps, 'layout'> {
	dragging?: boolean
	offset?: number
	status: ComponentStatus
}

export interface HandleVirtualListItemDragEndOptions extends Pick<VirtualListItemProps, 'onDragEnd'> {
	indexKey?: string
}

export type VirtualListItemContainerProps = Pick<RenderVirtualListItemProps, 'itemSize' | 'layout' | 'dragging'>
export type VirtualListItemDragContentProps = Pick<RenderVirtualListItemProps, 'itemSize' | 'layout' | 'gap'>
