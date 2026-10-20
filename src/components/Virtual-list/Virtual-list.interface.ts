import type {RefAttributes, RefObject} from 'react'
import type {ScrollView, ScrollViewProps, ViewStyle} from 'react-native'
import type {PanGestureHandlerEventPayload} from 'react-native-gesture-handler'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {ComponentStatus, LayoutRectangle, LayoutType} from '../../constants'
import type {InteractionHandlers} from '../../hooks'
import type {ThemeProps} from '../../theme'
import type {NativeScrollEvent} from 'react-native'

export interface Item {
	dependencies?: string[]
	index?: number
	indexKey: string
}

export interface RenderVirtualListItemInfo<T> {
	item: T & Item
}

export type VirtualListData<T = Record<string, unknown>> = T & {
	index?: number
	indexKey: string
}

export interface VirtualListCloseEvent {
	activeKey?: string
	indexKey: string
}

export interface NativeDragEvent extends PanGestureHandlerEventPayload {
	endIndex?: number
	indexKey: string
	startIndex?: number
	targetKey?: string
}

export interface VirtualListProps<T> extends Omit<ScrollViewProps, 'onScroll'>, RefAttributes<ScrollView>, ThemeProps {
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
	onClose?: (event: VirtualListCloseEvent) => void
	onDragEnd?: (event: NativeDragEvent) => void
	onDragUpdate?: (event: NativeDragEvent) => void
	onEndReached?: () => void
	onLoadEnd?: (indexKey?: string) => void
	onScroll?: (event: NativeScrollEvent) => void
	renderItem?: (options: RenderVirtualListItemInfo<T>) => React.JSX.Element
}

export interface RenderVirtualListProps<T = Record<string, unknown>>
	extends Omit<VirtualListProps<T>, 'onScroll'>, Pick<ScrollViewProps, 'onScroll'> {
	containerLayout: Partial<LayoutRectangle>
	contentAnimatedStyle?: AnimatedStyle<ViewStyle>
	contentSize?: number
	emptyList?: boolean
	interactionHandlers: InteractionHandlers
	itemElements?: React.JSX.Element
	status: ComponentStatus
}

export type VirtualListBaseProps<T> = VirtualListProps<T>
export interface VirtualListState {
	dragging?: boolean
	dragScrollOffset?: number
	emptyList?: boolean
	endIndex?: number
	layout: Partial<LayoutRectangle>
	loading?: boolean
	pendingCloseEvent?: VirtualListCloseEvent
	pendingDragEndEvent?: NativeDragEvent
	pendingDragUpdateEvent?: NativeDragEvent
	pendingEndReachedEvent?: boolean
	pendingScrollEvent?: NativeScrollEvent
	scrollOffset?: number
	startIndex?: number
	status: ComponentStatus
	virtualListData?: VirtualListData[]
	visibleRangeData?: VirtualListData[]
}

export interface HandleVirtualListScrollOptions
	extends
		Pick<RenderVirtualListProps, 'itemSize' | 'endReachedThreshold' | 'onEndReached'>,
		Pick<VirtualListProps<unknown>, 'layoutType' | 'onScroll'> {
	scrollOffsetRef?: RefObject<number>
}

export interface HandleVirtualListLayoutChangeOptions {
	layout: LayoutRectangle
}

export type TriggerVirtualListCloseOptions = Pick<RenderVirtualListProps, 'enableAutoSelect' | 'onClose' | 'activeKey'>
export interface CloseVirtualListOptions
	extends TriggerVirtualListCloseOptions, Pick<RenderVirtualListProps, 'itemSize' | 'activeKey' | 'layoutType'> {
	scrollOffsetRef?: RefObject<number>
}

export interface HandleVirtualListDragStartConfig {
	scrollOffsetRef?: RefObject<number>
}

export interface HandleVirtualListContentVisibleOptions {
	emptyList?: boolean
	loading?: boolean
}

export interface UseVirtualListScrollAnimatedOptions extends Pick<
	RenderVirtualListProps,
	'focusedIndex' | 'itemSize' | 'layoutType'
> {
	contentSize?: number
}

export interface RenderVirtualListItemOptions<T> extends Pick<
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
	| 'radius'
	| 'renderItem'
	| 'shape'
> {
	onClose?: (indexKey?: string) => void
	onDragEnd?: (event: NativeDragEvent) => void
	onDragStart?: (event: NativeDragEvent) => void
	onDragUpdate?: (event: NativeDragEvent) => void
	scrollOffset?: number
}

export type UpdateVirtualListLayoutOptions = Pick<RenderVirtualListProps, 'itemSize' | 'layoutType'> & {
	scrollOffsetRef?: RefObject<number>
}

export interface CalculateVirtualListVisibleRangeOptions {
	force?: boolean
	scrollDelta?: number
	scrollOffset?: number
}

export interface HandleVirtualListDragEndOptions {
	endIndex?: number
	setState: Updater<VirtualListState>
	startIndex?: number
}

export type HandleVirtualListDragUpdateOptions = Pick<
	RenderVirtualListProps,
	'itemSize' | 'layoutType' | 'onDragUpdate'
>
