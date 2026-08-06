import type {DragRef} from '@/components/Drag'
import type {ComponentStatus} from '@/constants'
import type {RefAttributes} from 'react'
import type {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import type {
    GestureStateChangeEvent,
    GestureUpdateEvent,
    PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {
    HandleDragEndOptions,
    HandleDragStartOptions,
    HandleDragUpdateOptions,
    RenderVirtualListProps
} from '../Virtual-list.interface'

export interface Item {
    dependencies?: string[]
    index?: number
    indexKey?: string
}

export interface RenderVirtualListItemInfo<T> {
    item: T & Item
}

export interface VirtualListItemProps<T = Record<string, unknown>>
    extends
        ViewProps,
        RefAttributes<View>,
        Pick<
            RenderVirtualListProps<T>,
            'dependencies' | 'draggable' | 'gap' | 'itemSize' | 'layoutType' | 'onLoadEnd' | 'renderItem' | 'shape'
        > {
    containerLayout?: LayoutRectangle
    index?: number
    item?: T & Item
    loading?: boolean
    onDragEnd?: (options: HandleDragEndOptions) => void
    onDragStart?: (options: HandleDragStartOptions) => void
    onDragUpdate?: (options: HandleDragUpdateOptions) => void
    onClose?: (indexKey?: string) => void
    scrollOffset?: number
}

export interface RenderVirtualListItemProps<T = Record<string, unknown>> extends Omit<
    VirtualListItemProps<T>,
    'onUnmount' | 'onDragUpdate' | 'onDragEnd' | 'onDragStart'
> {
    containerAnimatedStyle?: AnimatedStyle<ViewStyle>
    dragging?: boolean
    dragOffset?: number
    dragRef?: React.RefObject<DragRef | null>
    itemElement?: React.JSX.Element
    offset?: number
    onDragEnd?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
    onDragStart?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
    onDragUpdate?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void
    onClose?: () => void
    zIndex?: number
}

export type VirtualListItemBaseProps<T = Record<string, unknown>> = VirtualListItemProps<T>
export interface VirtualListItemState {
    dragging?: boolean
    index?: number
    nextDragEndEvent?: () => void
    nextDragStartEvent?: () => void
    status: ComponentStatus
    zIndex: number
}

export interface UseVirtualListItemAnimatedOptions extends Pick<VirtualListItemProps, 'layoutType'> {
    dragging?: boolean
    offset?: number
    onAnimationFinished?: (visible?: boolean) => void
    status: ComponentStatus
}

export interface HandleVirtualListItemDragEndOptions extends Pick<VirtualListItemProps, 'onDragEnd'> {
    indexKey?: string
    dragRef: React.RefObject<DragRef | null>
}

export interface HandleVirtualListItemDragStartOptions extends Pick<VirtualListItemProps, 'onDragStart'> {
    indexKey?: string
}
