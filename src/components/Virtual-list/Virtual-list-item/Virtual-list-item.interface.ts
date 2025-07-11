import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {ComponentStatus} from '../../Common'
import type {RenderVirtualListProps} from '../Virtual-list.interface'

export interface Item {
	dependencies?: string[]
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
			'itemSize' | 'renderItem' | 'dependencies' | 'onLoadEnd' | 'gap' | 'layout'
		> {
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

export type VirtualListItemBaseProps<T = Record<string, unknown>> = VirtualListItemProps<T>
export interface VirtualListItemState {
	visible?: boolean
	status: ComponentStatus
}

export interface UseVirtualListItemAnimatedOptions extends Pick<VirtualListItemProps, 'layout'> {
	offset?: number
	status: ComponentStatus
}

export type VirtualListItemContainerProps = Pick<RenderVirtualListItemProps, 'itemSize' | 'layout'>
