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
import type {HandleDragUpdateOptions, RenderVirtualListProps} from '../Virtual-list.interface'

export interface Item {
	afterAffordanceSecondaryButtonProps?: ListAffordanceButtonProps
	dependencies?: string[]
	indexKey?: string
}

export interface RenderVirtualListItemInfo<T> {
	index: number
	item: T & Item
}

export interface VirtualListItemProps<T = Record<string, unknown>>
	extends ViewProps,
		RefAttributes<View>,
		Pick<
			RenderVirtualListProps<T>,
			'itemSize' | 'renderItem' | 'dependencies' | 'onLoadEnd' | 'gap' | 'layout' | 'draggable'
		> {
	containerLayout?: LayoutRectangle
	index?: number
	item?: T & Item
	loading?: boolean
	onDragUpdate?: (options: HandleDragUpdateOptions) => void
	onUnmount?: (indexKey?: string) => void
	startIndex?: number
}

export interface RenderVirtualListItemProps<T = Record<string, unknown>>
	extends Omit<VirtualListItemProps<T>, 'onUnmount' | 'onDragUpdate'> {
	containerAnimatedStyle?: AnimatedStyle<ViewStyle>
	itemElement?: React.JSX.Element
	onDragStart?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
	onDragUpdate?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void
	onDragEnd?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
	onUnmount?: () => void
	unmount?: boolean
	visible?: boolean
}

export type VirtualListItemBaseProps<T = Record<string, unknown>> = VirtualListItemProps<T>
export interface VirtualListItemState {
	dragging?: boolean
	status: ComponentStatus
	visible?: boolean
}

export interface UseVirtualListItemAnimatedOptions extends Pick<VirtualListItemProps, 'layout'> {
	dragging?: boolean
	offset?: number
	status: ComponentStatus
}

export type ContainerProps = Pick<RenderVirtualListItemProps, 'itemSize' | 'layout'>
export type DragContentProps = Pick<RenderVirtualListItemProps, 'itemSize' | 'containerLayout' | 'layout'>
