import {RefAttributes} from 'react'
import {LayoutRectangle, ScrollViewProps, ViewStyle} from 'react-native'
import Animated, {AnimatedStyle} from 'react-native-reanimated'
import {OnStateEvent} from '../../hooks'
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
        emptyComponent?: JSX.Element
        enableAutoSelect?: boolean
        extraData?: string[]
        focusedIndex?: number
        gap?: number
        itemSize?: number
        loading?: boolean
        loadingComponent?: JSX.Element
        onClose?: (options: OnVirtualListCloseOptions) => void
        onLoadEnd?: (value?: string) => void
        renderItem?: (options: RenderVirtualListItemInfo<T>) => JSX.Element
}

export interface RenderVirtualListProps<T = Record<string, unknown>> extends VirtualListProps<T> {
        contentAnimatedStyle?: AnimatedStyle<ViewStyle>
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
export interface UseVirtualListScrollAnimatedOptions extends Pick<RenderVirtualListProps, 'focusedIndex' | 'itemSize'> {
        contentSize?: number
}

export interface VirtualListContentProps {
        contentVisible?: boolean
}
