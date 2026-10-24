import type {JSX, RefAttributes, RefObject} from 'react'
import type {NativeScrollEvent, ScrollView, ScrollViewProps, ViewStyle} from 'react-native'
import type {PanGestureHandlerEventPayload} from 'react-native-gesture-handler'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus, MeasuredLayoutRectangle, Orientation} from '../../constants'
import type {InteractionHandlers} from '../../hooks'
import type {ThemeableProps} from '../../theme'

export interface VirtualListBaseItem {
	dependencies?: string[]
	index: number
	itemKey: string
}

export interface RenderVirtualListItemInfo<T = VirtualListBaseItem> {
	item: T & {index: number}
}

export type VirtualListItemData<T = Record<string, unknown>> = T & {
	index?: number
	itemKey: string
}

export interface VirtualListCloseEvent {
	itemKey: string
	nextActiveKey?: string
}

export interface VirtualListDragEvent extends PanGestureHandlerEventPayload {
	endIndex?: number
	itemKey: string
	startIndex?: number
	targetKey?: string
}

export interface VirtualListProps<T = any>
	extends Omit<ScrollViewProps, 'onScroll'>, RefAttributes<ScrollView>, ThemeableProps {
	activeKey?: string
	autoSelectAdjacentOnClose?: boolean
	data?: VirtualListItemData<T>[]
	dependencies?: unknown[]
	draggable?: boolean
	emptyElement?: React.JSX.Element
	endReachedThreshold?: number
	focusedIndex?: number
	gap?: number
	itemSize?: number
	loading?: boolean
	loadingElement?: React.JSX.Element
	onClose?: (event: VirtualListCloseEvent) => void
	onDragEnd?: (event: VirtualListDragEvent) => void
	onDragUpdate?: (event: VirtualListDragEvent) => void
	onEndReached?: () => void
	onLoadEnd?: (itemKey?: string) => void
	onScroll?: (event: NativeScrollEvent) => void
	orientation?: Orientation
	renderItem?: (options: RenderVirtualListItemInfo<T>) => JSX.Element
}

export interface RenderVirtualListProps extends Omit<VirtualListProps, 'onScroll'>, Pick<ScrollViewProps, 'onScroll'> {
	containerLayout: Partial<MeasuredLayoutRectangle>
	contentAnimatedStyle?: AnimatedStyle<ViewStyle>
	contentSize?: number
	emptyList?: boolean
	interactionHandlers: InteractionHandlers
	itemElements?: JSX.Element
	status: ComponentStatus
}

export type VirtualListBaseProps = VirtualListProps
export interface VirtualListState {
	dragging?: boolean
	dragScrollOffset?: number
	emptyList?: boolean
	endIndex?: number
	layout: Partial<MeasuredLayoutRectangle>
	loading?: boolean
	pendingCloseEvent?: VirtualListCloseEvent
	pendingDragEndEvent?: VirtualListDragEvent
	pendingDragUpdateEvent?: VirtualListDragEvent
	pendingEndReachedEvent?: boolean
	pendingScrollEvent?: NativeScrollEvent
	scrollOffset?: number
	startIndex?: number
	status: ComponentStatus
	virtualListData?: VirtualListItemData[]
	visibleRangeData?: VirtualListItemData[]
}

export interface HandleVirtualListScrollOptions
	extends
		Pick<RenderVirtualListProps, 'itemSize' | 'endReachedThreshold' | 'onEndReached'>,
		Pick<VirtualListProps<unknown>, 'orientation' | 'onScroll'> {
	scrollOffsetRef?: RefObject<number>
}

export type TriggerVirtualListCloseOptions = Pick<
	RenderVirtualListProps,
	'autoSelectAdjacentOnClose' | 'onClose' | 'activeKey'
>
export interface CloseVirtualListOptions
	extends TriggerVirtualListCloseOptions, Pick<RenderVirtualListProps, 'itemSize' | 'activeKey' | 'orientation'> {
	scrollOffsetRef?: RefObject<number>
}

export interface HandleVirtualListDragStartOptions {
	scrollOffsetRef?: RefObject<number>
}

export interface UseVirtualListScrollAnimatedOptions extends Pick<
	RenderVirtualListProps,
	'focusedIndex' | 'itemSize' | 'orientation'
> {
	contentSize?: number
}

export interface RenderVirtualListItemsProps extends Pick<
	RenderVirtualListProps,
	| 'containerLayout'
	| 'data'
	| 'dependencies'
	| 'draggable'
	| 'gap'
	| 'id'
	| 'itemSize'
	| 'orientation'
	| 'onLoadEnd'
	| 'radius'
	| 'renderItem'
	| 'shape'
> {
	onClose?: (itemKey?: string) => void
	onDragEnd?: (event: VirtualListDragEvent) => void
	onDragStart?: (event: VirtualListDragEvent) => void
	onDragUpdate?: (event: VirtualListDragEvent) => void
	scrollOffset?: number
}

export type UpdateVirtualListLayoutOptions = Pick<RenderVirtualListProps, 'itemSize' | 'orientation'> & {
	scrollOffsetRef?: RefObject<number>
}

export interface CalculateVirtualListVisibleRangeOptions {
	force?: boolean
	scrollDelta?: number
	scrollOffset?: number
}

export interface HandleVirtualListDragEndOptions {
	endIndex?: number
	startIndex?: number
}

export type HandleVirtualListDragUpdateOptions = Pick<
	RenderVirtualListProps,
	'itemSize' | 'orientation' | 'onDragUpdate'
>
