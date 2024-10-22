import {RefAttributes} from 'react'
import {LayoutRectangle, ScrollView, ScrollViewProps} from 'react-native'
import {OnStateEvent} from '../../hooks'
import {ComponentStatus} from '../Common'
import {VirtualListItemProps} from './Virtual-list-item/Virtual-list-item.interface'

export type VirtualListData<T = Record<string, unknown>> = T & {
    indexKey?: string
}

export interface VirtualListProps<T>
    extends ScrollViewProps,
        RefAttributes<ScrollView>,
        Pick<
            VirtualListItemProps<T>,
            'itemSize' | 'renderItem' | 'extraData' | 'onLoadEnd'
        > {
    data?: VirtualListData<T>[]
    focusedIndex?: number
    listEmptyComponent?: JSX.Element
    listLoadingComponent?: JSX.Element
    loading?: boolean
}

export interface RenderVirtualListProps<T = Record<string, unknown>>
    extends VirtualListProps<T> {
    contentSize?: number
    contentVisible?: boolean
    itemElements?: JSX.Element[]
    onContentVisible: (value?: boolean) => void
    onStateEvent: OnStateEvent
    skeletonLoading?: boolean
}

export interface VirtualListBaseProps<T> extends VirtualListProps<T> {
    render: (props: RenderVirtualListProps<T>) => JSX.Element
}

export interface VirtualListState {
    contentVisible?: boolean
    endIndex?: number
    layout: LayoutRectangle
    nextLoadEndEvent?: () => void
    nextScrollEvent?: () => void
    scrollOffset?: number
    startIndex?: number
    status: ComponentStatus
    virtualListData?: VirtualListData[]
    visibleRangeData?: VirtualListData[]
}

export type HandleVirtualListScrollOptions = Pick<
    RenderVirtualListProps,
    'onScroll' | 'itemSize'
>

export interface HandleVirtualListLayoutChangedOptions {
    layout: LayoutRectangle
    onVirtualListVisibleRange?: (value?: number) => void
}

export interface HandleVirtualListVisibleRangeOptions {
    itemSize?: number
    skeletonLoading?: boolean
}

export type HandleVirtualListLayoutOptions =
    HandleVirtualListVisibleRangeOptions

export type HandleVirtualListDataChangeOptions =
    HandleVirtualListVisibleRangeOptions
