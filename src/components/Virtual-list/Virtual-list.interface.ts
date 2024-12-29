import {RefAttributes} from 'react'
import {LayoutRectangle, ScrollViewProps} from 'react-native'
import Animated from 'react-native-reanimated'
import {OnStateEvent} from '../../hooks'
import {ComponentStatus} from '../Common'
import {VirtualListItemProps, VirtualListItemUnmountOptions} from './Virtual-list-item/Virtual-list-item.interface'

export type VirtualListData<T = Record<string, unknown>> = T & {
        indexKey?: string
}

export interface VirtualListProps<T>
        extends ScrollViewProps,
                RefAttributes<Animated.ScrollView>,
                Pick<VirtualListItemProps<T>, 'itemSize' | 'renderItem' | 'extraData' | 'onLoadEnd' | 'gap'> {
        data?: VirtualListData<T>[]
        emptyComponent?: JSX.Element
        focusedIndex?: number
        loading?: boolean
        loadingComponent?: JSX.Element
}

export interface RenderVirtualListProps<T = Record<string, unknown>> extends VirtualListProps<T> {
        contentSize?: number
        emptyList?: boolean
        itemElements?: JSX.Element[]
        onStateEvent: OnStateEvent
        status: ComponentStatus
}

export interface VirtualListBaseProps<T> extends VirtualListProps<T> {
        render: (props: RenderVirtualListProps<T>) => JSX.Element
}

export interface VirtualListState {
        emptyList?: boolean
        endIndex?: number
        layout: LayoutRectangle
        nextItemVisibleEvent?: () => void
        nextLoadEndEvent?: () => void
        nextScrollEvent?: () => void
        scrollOffset?: number
        status: ComponentStatus
        virtualListData?: VirtualListData[]
        visibleRangeData?: VirtualListData[]
}

export type HandleVirtualListScrollOptions = Pick<RenderVirtualListProps, 'onScroll' | 'itemSize'>
export interface HandleVirtualListLayoutChangedOptions {
        layout: LayoutRectangle
        onVirtualListVisibleRange?: (value?: number) => void
}

export type HandleVirtualListItemUnmountOptions = VirtualListItemUnmountOptions
