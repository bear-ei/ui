import type {RefAttributes} from 'react'
import type {LayoutRectangle, ScrollViewProps, ViewStyle} from 'react-native'
import type Animated from 'react-native-reanimated'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {InteractionHandler} from '../../hooks'
import type {ComponentStatus} from '../Common'
import type {RenderVirtualListItemInfo} from './Virtual-list-item/Virtual-list-item.interface'

export type VirtualListData<T = Record<string, unknown>> = T & {
	indexKey?: string
}

export interface OnVirtualListCloseOptions {
	activeKey?: string
	indexKey?: string
}

export interface VirtualListProps<T> extends ScrollViewProps, RefAttributes<Animated.ScrollView> {
	data?: VirtualListData<T>[]
	emptyElement?: React.JSX.Element
	enableAutoSelect?: boolean
	extraData?: string[]
	focusedIndex?: number
	gap?: number
	itemSize?: number
	loading?: boolean
	loadingElement?: React.JSX.Element
	onClose?: (options: OnVirtualListCloseOptions) => void
	onLoadEnd?: (indexKey?: string) => void
	renderItem?: (options: RenderVirtualListItemInfo<T>) => React.JSX.Element
}

export interface RenderVirtualListProps<T = Record<string, unknown>> extends VirtualListProps<T> {
	contentAnimatedStyle?: AnimatedStyle<ViewStyle>
	contentSize?: number
	emptyList?: boolean
	itemElements?: React.JSX.Element[]
	layout: LayoutRectangle
	interactionHandlers: InteractionHandler
	status: ComponentStatus
}

export interface VirtualListBaseProps<T> extends VirtualListProps<T> {
	renderVirtualList: (props: RenderVirtualListProps<T>) => React.JSX.Element
}

export interface VirtualListState {
	emptyList?: boolean
	endIndex?: number
	layout: LayoutRectangle
	nextCloseEvent?: () => void
	nextScrollEvent?: () => void
	scrollOffset?: number
	startIndex?: number
	status: ComponentStatus
	virtualListData?: VirtualListData[]
	visibleRangeData?: VirtualListData[]
}

export type HandleVirtualListScrollOptions = Pick<RenderVirtualListProps, 'onScroll' | 'itemSize'>
export interface HandleVirtualListLayoutChangeOptions {
	layout: LayoutRectangle
}

export type TriggerVirtualListCloseOptions = Pick<RenderVirtualListProps, 'enableAutoSelect' | 'onClose'>
export interface UnmountVirtualListUnmountOptions
	extends TriggerVirtualListCloseOptions,
		Pick<RenderVirtualListProps, 'itemSize'> {}

export interface HandleVirtualListContentVisibleOptions {
	loading?: boolean
	emptyList?: boolean
}

export interface UseVirtualListScrollAnimatedOptions extends Pick<RenderVirtualListProps, 'focusedIndex' | 'itemSize'> {
	contentSize?: number
}

export interface RenderVirtualListItemOptions<T>
	extends Pick<RenderVirtualListProps<T>, 'itemSize' | 'renderItem' | 'extraData' | 'onLoadEnd' | 'gap' | 'id'> {
	onUnmount?: (indexKey?: string) => void
	startIndex?: number
}
