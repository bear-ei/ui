import {View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'

export interface Item {
    extraData?: string[]
}

export interface RenderVirtualListItemInfo<T> {
    index: number
    item: T & Item
}

export interface VirtualListItemProps<T = Record<string, unknown>> extends ViewProps, React.RefAttributes<View> {
    extraData?: unknown[]
    index?: number
    item?: T & Item
    itemSize?: number
    onLoadEnd?: (value?: string) => void
    onUnmount?: (value?: string) => void
    renderItem?: (options: RenderVirtualListItemInfo<T>) => React.JSX.Element
    startIndex?: number
    visible?: boolean
}

export interface RenderVirtualListItemProps<T = Record<string, unknown>> extends VirtualListItemProps<T> {
    containerAnimatedStyle: AnimatedStyle<ViewStyle>
    itemElement?: React.JSX.Element
    unmount?: boolean
}

export interface VirtualListItemBaseProps<T = Record<string, unknown>> extends VirtualListItemProps<T> {
    render: (props: RenderVirtualListItemProps<T>) => React.JSX.Element
}

export interface InitialVirtualListItemState {
    virtualListItemVisible?: boolean
}

export type RenderVirtualListItemOptions<T> = Pick<
    VirtualListItemProps<T>,
    'itemSize' | 'renderItem' | 'extraData' | 'onUnmount' | 'onLoadEnd'
>

export interface UseVirtualListItemAnimatedOptions {
    top?: number
}
