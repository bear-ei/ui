import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {VirtualListProps} from '../Virtual-list.interface'

export interface Item {
        extraData?: string[]
}

export interface RenderVirtualListItemInfo<T> {
        index: number
        item: T & Item
}

export interface VirtualListItemProps<T = Record<string, unknown>>
        extends ViewProps,
                RefAttributes<View>,
                Pick<VirtualListProps<T>, 'itemSize' | 'renderItem' | 'extraData' | 'onLoadEnd' | 'gap'> {
        index?: number
        item?: T & Item
        loading?: boolean
        onUnmount?: (value?: string) => void
        startIndex?: number
        visible?: boolean
}

export interface RenderVirtualListItemProps<T = Record<string, unknown>>
        extends Omit<VirtualListItemProps<T>, 'onUnmount'> {
        itemElement?: JSX.Element
        onUnmount?: () => void
        unmount?: boolean
}

export interface VirtualListItemBaseProps<T = Record<string, unknown>> extends VirtualListItemProps<T> {
        render: (props: RenderVirtualListItemProps<T>) => JSX.Element
}

export interface VirtualListItemState {
        nextVisibleEvent?: () => void
        visible?: boolean
}

export type HandleVirtualListItemOptions<T> = Pick<
        VirtualListItemProps<T>,
        'itemSize' | 'renderItem' | 'extraData' | 'onUnmount' | 'onLoadEnd' | 'gap'
>

export interface UseVirtualListItemAnimatedOptions {
        top?: number
}

export type VirtualListItemContainerProps = Pick<RenderVirtualListItemProps, 'itemSize'>
