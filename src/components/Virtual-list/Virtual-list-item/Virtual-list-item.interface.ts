import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {ComponentStatus} from '../../Common'
import type {VirtualListProps} from '../Virtual-list.interface'

export interface Item {
	extraData?: string[]
}

export interface RenderVirtualListItemInfo<T> {
	index: number
	item: T & Item
}

export interface VirtualListItemProps<T = Record<string, unknown>>
	extends ViewProps,
		RefAttributes<View>,
		Pick<VirtualListProps<T>, 'itemSize' | 'renderItem' | 'extraData' | 'onLoadEnd' | 'gap'> {
	index?: number
	item?: T & Item
	loading?: boolean
	onUnmount?: (indexKey?: string) => void
	startIndex?: number
}

export interface RenderVirtualListItemProps<T = Record<string, unknown>>
	extends Omit<VirtualListItemProps<T>, 'onUnmount'> {
	containerAnimatedStyle?: AnimatedStyle<ViewStyle>
	itemElement?: React.JSX.Element
	onUnmount?: () => void
	unmount?: boolean
	visible?: boolean
}

export interface VirtualListItemBaseProps<T = Record<string, unknown>> extends VirtualListItemProps<T> {
	render: (props: RenderVirtualListItemProps<T>) => React.JSX.Element
}

export interface VirtualListItemState {
	visible?: boolean
	status: ComponentStatus
}

export interface UseVirtualListItemAnimatedOptions {
	offsetY?: number
}

export type VirtualListItemContainerProps = Pick<RenderVirtualListItemProps, 'itemSize'>
