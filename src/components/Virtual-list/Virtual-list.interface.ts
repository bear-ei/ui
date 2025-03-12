import {RefAttributes} from 'react'
import {LayoutRectangle, ScrollViewProps, ViewStyle} from 'react-native'
import Animated, {AnimatedStyle} from 'react-native-reanimated'
import {StateEvent} from '../../hooks'
import {ComponentStatus} from '../Common'
import {RenderVirtualListItemInfo} from './Virtual-list-item/Virtual-list-item.interface'

export type VirtualListData<T = Record<string, unknown>> = T & {
        indexKey?: string
}

export interface OnVirtualListCloseOptions {
        activeKey?: string
        indexKey?: string
}

export interface VirtualListProps<T> extends ScrollViewProps, RefAttributes<Animated.ScrollView> {
        data?: VirtualListData<T>[]
        emptyComponent?: React.JSX.Element
        enableAutoSelect?: boolean
        extraData?: string[]
        focusedIndex?: number
        gap?: number
        itemSize?: number
        loading?: boolean
        loadingComponent?: React.JSX.Element
        onClose?: (options: OnVirtualListCloseOptions) => void
        onLoadEnd?: (value?: string) => void
        renderItem?: (options: RenderVirtualListItemInfo<T>) => React.JSX.Element
}

export interface RenderVirtualListProps<T = Record<string, unknown>> extends VirtualListProps<T> {
        contentAnimatedStyle?: AnimatedStyle<ViewStyle>
        contentSize?: number
        emptyList?: boolean
        itemElements?: React.JSX.Element[]
        layout: LayoutRectangle
        stateEvent: StateEvent
        status: ComponentStatus
}

export interface VirtualListBaseProps<T> extends VirtualListProps<T> {
        render: (props: RenderVirtualListProps<T>) => React.JSX.Element
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
        onVirtualListVisibleRange?: (value?: number) => void
}

export type HandleVirtualListCloseOptions = Pick<RenderVirtualListProps, 'enableAutoSelect' | 'onClose'>
export interface HandleVirtualListUnmountOptions
        extends HandleVirtualListCloseOptions,
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
        onUnmount?: (value?: string) => void
        startIndex?: number
}
