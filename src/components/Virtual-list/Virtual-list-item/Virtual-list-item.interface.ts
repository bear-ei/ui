import {RefAttributes} from 'react'
import {View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'

export interface Item {
        extraData?: unknown[]
}

export interface RenderVirtualListItemInfo<T> {
        index: number
        item: T & Item
}

export interface VirtualListItemProps<T = Record<string, unknown>> extends ViewProps, RefAttributes<View> {
        extraData?: unknown[]
        gap?: number
        index?: number
        item?: T & Item
        itemSize?: number
        loading?: boolean
        onLoadEnd?: (value?: string) => void
        onUnmount?: (value?: string) => void
        renderItem?: (options: RenderVirtualListItemInfo<T>) => JSX.Element
        startIndex?: number
        visible?: boolean
}

export interface RenderVirtualListItemProps<T = Record<string, unknown>> extends VirtualListItemProps<T> {
        containerAnimatedStyle: AnimatedStyle<ViewStyle>
        itemElement?: JSX.Element
        unmount?: boolean
}

export interface VirtualListItemBaseProps<T = Record<string, unknown>> extends VirtualListItemProps<T> {
        render: (props: RenderVirtualListItemProps<T>) => JSX.Element
}

export interface VirtualListItemState {
        visible?: boolean
}

export type RenderVirtualListItemOptions<T> = Pick<
        VirtualListItemProps<T>,
        'itemSize' | 'renderItem' | 'extraData' | 'onUnmount' | 'onLoadEnd' | 'gap'
>

export interface UseVirtualListItemAnimatedOptions {
        top?: number
}

export interface VirtualListItemContainerOptions {
        height?: number
}
