import {ComponentStatus, LayoutRectangle, LayoutType, ShapeType} from '@/constants'
import {InteractionHandlers} from '@/hooks'
import type {RefAttributes} from 'react'
import type {ScrollView, ScrollViewProps, ViewStyle} from 'react-native'
import type {
        GestureStateChangeEvent,
        GestureUpdateEvent,
        PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
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
        dragging?: boolean
        emptyList?: boolean
        endIndex?: number
        layout: LayoutRectangle
        loading?: boolean
        nextCloseEvent?: () => void
        nextDragEndEvent?: () => void
        nextDragUpdateEvent?: () => void
        nextEndReachedEvent?: () => void
        nextLoadEndEvent?: () => void
        nextScrollEvent?: () => void
        scrollOffset?: number
        startIndex?: number
        status: ComponentStatus
        virtualListData?: VirtualListData[]
        visibleRangeData?: VirtualListData[]
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
export interface closeVirtualListOptions
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
        onClose?: (indexKey?: string) => void
        onDragEnd?: (options: HandleDragEndOptions) => void
        onDragStart?: (options: HandleDragStartOptions) => void
        onDragUpdate?: (options: HandleDragUpdateOptions) => void
        scrollOffset?: number
}

export type UpdateVirtualListLayoutOptions = Pick<RenderVirtualListProps, 'itemSize' | 'layoutType'>
export interface HandleDragUpdateOptions {
        event: GestureUpdateEvent<PanGestureHandlerEventPayload>
        indexKey: string
}

export interface HandleDragStartOptions {
        event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
        indexKey: string
}

export type HandleDragEndOptions = HandleDragStartOptions
export interface HandleVirtualListDragEndOptions {
        endIndex?: number
        setState: Updater<VirtualListState>
        startIndex?: number
}

export type HandleVirtualListDragUpdateOptions = Pick<
        RenderVirtualListProps,
        'itemSize' | 'layoutType' | 'onDragUpdate'
>
