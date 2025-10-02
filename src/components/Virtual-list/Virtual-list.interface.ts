import type {RefAttributes} from 'react'
import type {ScrollView, ScrollViewProps, ViewStyle} from 'react-native'
import type {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {InteractionHandlers} from '../../hooks'
import type {ComponentStatus, LayoutRectangle, LayoutType, ShapeType} from '../Common'
import type {RenderVirtualListItemInfo} from './Virtual-list-item'

export type VirtualListData<T = Record<string, unknown>> = T & {
	indexKey?: string
	index?: number
}

export interface OnVirtualListCloseOptions {
	activeKey?: string
	indexKey?: string
}

export interface OnDragEndOptions {
	endIndex?: number
	event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
	indexKey: string
	startIndex?: number
}

export interface OnDragUpdateOptions {
	event: GestureUpdateEvent<PanGestureHandlerEventPayload>
	indexKey: string
	targetKey?: string
}

export interface VirtualListProps<T> extends ScrollViewProps, RefAttributes<ScrollView> {
	activeKey?: string
	data?: VirtualListData<T>[]
	dependencies?: unknown[]
	draggable?: boolean
	emptyElement?: React.JSX.Element
	enableAutoSelect?: boolean
	endReachedThreshold?: number
	focusedIndex?: number
	gap?: number
	itemSize?: number
	layoutType?: LayoutType
	loading?: boolean
	loadingElement?: React.JSX.Element
	onClose?: (options: OnVirtualListCloseOptions) => void
	onDragEnd?: (options: OnDragEndOptions) => void
	onDragUpdate?: (options: OnDragUpdateOptions) => void
	onEndReached?: () => void
	onLoadEnd?: (indexKey?: string) => void
	renderItem?: (options: RenderVirtualListItemInfo<T>) => React.JSX.Element
	shape?: ShapeType
}

export interface RenderVirtualListProps<T = Record<string, unknown>> extends VirtualListProps<T> {
	containerLayout: LayoutRectangle
	contentAnimatedStyle?: AnimatedStyle<ViewStyle>
	contentSize?: number
	emptyList?: boolean
	interactionHandlers: InteractionHandlers
	itemElements?: React.JSX.Element
	status: ComponentStatus
}

export type VirtualListBaseProps<T> = VirtualListProps<T>
export interface VirtualListState {
	emptyList?: boolean
	endIndex?: number
	layout: LayoutRectangle
	loading?: boolean
	nextCloseEvent?: () => void
	nextDragUpdateEvent?: () => void
	nextEndReachedEvent?: () => void
	nextLoadEndEvent?: () => void
	nextScrollEvent?: () => void
	scrollOffset?: number
	startIndex?: number
	status: ComponentStatus
	virtualListData?: (VirtualListData & {index: number})[]
	visibleRangeData?: (VirtualListData & {index: number})[]
}

export interface HandleVirtualListScrollOptions
	extends Pick<RenderVirtualListProps, 'onScroll' | 'itemSize' | 'endReachedThreshold'>,
		Pick<VirtualListProps<unknown>, 'layoutType'> {
	onEndReached: () => void
}

export interface HandleVirtualListLayoutChangeOptions {
	layout: LayoutRectangle
}

export type TriggerVirtualListCloseOptions = Pick<RenderVirtualListProps, 'enableAutoSelect' | 'onClose' | 'activeKey'>
export interface UnmountVirtualListOptions
	extends TriggerVirtualListCloseOptions,
		Pick<RenderVirtualListProps, 'itemSize' | 'activeKey' | 'layoutType'> {}

export interface HandleVirtualListContentVisibilityOptions {
	loading?: boolean
	emptyList?: boolean
}

export interface UseVirtualListScrollAnimatedOptions
	extends Pick<RenderVirtualListProps, 'focusedIndex' | 'itemSize' | 'layoutType'> {
	contentSize?: number
}

export interface RenderVirtualListItemOptions<T>
	extends Pick<
		RenderVirtualListProps<T>,
		| 'containerLayout'
		| 'data'
		| 'dependencies'
		| 'draggable'
		| 'gap'
		| 'id'
		| 'itemSize'
		| 'layoutType'
		| 'onLoadEnd'
		| 'renderItem'
		| 'shape'
	> {
	onDragEnd?: (options: HandleDragEndOptions) => void
	onDragUpdate?: (options: HandleDragUpdateOptions) => void
	onUnmount?: (indexKey?: string) => void
	scrollOffset?: number
}

export type UpdateVirtualListLayoutOptions = Pick<RenderVirtualListProps, 'itemSize' | 'layoutType'>
export interface HandleDragUpdateOptions {
	event: GestureUpdateEvent<PanGestureHandlerEventPayload>
	indexKey: string
}

export interface HandleDragEndOptions {
	event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
	indexKey: string
}

export interface HandleVirtualListDragEndOptions {
	endIndex?: number
	startIndex?: number
}

export type HandleVirtualListDragUpdateOptions = Pick<
	RenderVirtualListProps,
	'itemSize' | 'layoutType' | 'onDragUpdate'
>
