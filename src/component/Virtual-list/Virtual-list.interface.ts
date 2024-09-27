import React from 'react'
import {LayoutRectangle, ScrollView, ScrollViewProps} from 'react-native'
import {OnStateEvent} from '../../hook'
import {ComponentStatus} from '../Common'
import {VirtualListItemProps} from './Virtual-list-item/Virtual-list-item.interface'

export type VirtualListData<T = Record<string, unknown>> = T & {indexKey?: string}
export interface VirtualListProps<T>
    extends ScrollViewProps,
        React.RefAttributes<ScrollView>,
        Pick<VirtualListItemProps<T>, 'itemSize' | 'renderItem' | 'extraData' | 'onLoadEnd'> {
    data?: VirtualListData<T>[]
    listEmptyComponent?: React.JSX.Element
}

export interface RenderVirtualListProps<T = Record<string, unknown>> extends VirtualListProps<T> {
    contentSize?: number
    contentVisible?: boolean
    itemElements?: React.JSX.Element[]
    onContentVisible: (value?: boolean) => void
    onStateEvent: OnStateEvent
}

export interface VirtualListBaseProps<T> extends VirtualListProps<T> {
    render: (props: RenderVirtualListProps<T>) => React.JSX.Element
}

export interface InitialVirtualListState {
    endIndex?: number
    contentVisible?: boolean
    layout: LayoutRectangle
    nextLoadEndEvent?: () => void
    nextScrollEvent?: () => void
    scrollOffset?: number
    startIndex?: number
    status: ComponentStatus
    virtualListData?: VirtualListData[]
    visibleRangeData?: VirtualListData[]
}

export type HandleVirtualListScrollOptions = Pick<RenderVirtualListProps, 'onScroll' | 'itemSize'>
export type HandleVirtualListLayoutOptions = Pick<RenderVirtualListProps, 'onLoadEnd' | 'itemSize'>
export interface HandleVirtualListLayoutChangedOptions {
    layout: LayoutRectangle
    onVirtualListVisibleRange?: (value?: number) => void
}
