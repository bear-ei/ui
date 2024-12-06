import {RefAttributes} from 'react'
import {OnStateEvent} from '../../hooks'
import {ComponentStatus} from '../Common'
import {RenderVirtualListItemInfo, VirtualList, VirtualListProps} from '../Virtual-list'
import {ListItemProps} from './List-item'

export type VirtualListComponent<T> = typeof VirtualList<T>
export type ListType = 'standard' | 'menu' | 'navigation'
export interface ListData
        extends Pick<
                ListItemProps,
                | 'contentStyle'
                | 'extraData'
                | 'headline'
                | 'leading'
                | 'supporting'
                | 'supportingTextNumberOfLines'
                | 'trailing'
                | 'trailingProps'
        > {
        indexKey: string
}

export type RenderListItemOptions = RenderVirtualListItemInfo<ListData> & HandleRenderItemOptions
export interface ListProps
        extends Partial<
                VirtualListProps<ListData> &
                        RefAttributes<VirtualListComponent<ListData>> &
                        Pick<
                                ListItemProps,
                                | 'activeKey'
                                | 'activeKeys'
                                | 'afterAffordance'
                                | 'afterAffordanceActiveKey'
                                | 'afterAffordancePrimaryButtonProps'
                                | 'afterAffordanceSecondaryButtonProps'
                                | 'beforeAffordance'
                                | 'closeTrailing'
                                | 'disabled'
                                | 'divider'
                                | 'enableUnderlay'
                                | 'enableUnderlayActive'
                                | 'focusedIndex'
                                | 'gap'
                                | 'onActive'
                                | 'onActiveAfterAffordance'
                                | 'onCancel'
                                | 'onClose'
                                | 'onConfirm'
                                | 'selectType'
                                | 'shape'
                                | 'skeletonElement'
                                | 'skeletonMinDuration'
                                | 'supportingTextNumberOfLines'
                                | 'trailing'
                                | 'trailingTrigger'
                                | 'type'
                        >
        > {
        data?: ListData[]
        defaultActiveKey?: string
        defaultActiveKeys?: string[]
        deselect?: boolean
        onActives?: (values?: string[]) => void
        onItemStateEvent?: OnStateEvent

        /**
         * Whether to enable auto-associative selection in radio mode. If the deleted item is an active item of the
         * current year, the list will automatically look for neighboring items with the active option.
         */
        autoActive?: boolean
}

export interface RenderListProps extends ListProps {
        onUnmount?: (value?: string) => void
}

export interface ListState {
        afterAffordanceActiveKey?: string
        listActiveKey?: string
        listActiveKeys?: string[]
        nextActiveEvent?: () => void
        nextAfterAffordanceActiveEvent?: () => void
        nextCloseEvent?: () => void
        status: ComponentStatus
}

export type HandleRenderItemOptions = Pick<
        RenderListProps,
        | 'activeKey'
        | 'activeKeys'
        | 'afterAffordance'
        | 'afterAffordanceActiveKey'
        | 'afterAffordancePrimaryButtonProps'
        | 'afterAffordanceSecondaryButtonProps'
        | 'beforeAffordance'
        | 'closeTrailing'
        | 'defaultActiveKey'
        | 'disabled'
        | 'divider'
        | 'enableUnderlay'
        | 'enableUnderlayActive'
        | 'extraData'
        | 'focusedIndex'
        | 'onActive'
        | 'onActiveAfterAffordance'
        | 'onCancel'
        | 'onClose'
        | 'onConfirm'
        | 'renderItem'
        | 'selectType'
        | 'shape'
        | 'skeletonElement'
        | 'skeletonMinDuration'
        | 'supportingTextNumberOfLines'
        | 'trailing'
        | 'trailingTrigger'
        | 'type'
>

export type HandleListCloseOptions = Pick<ListProps, 'onClose' | 'autoActive' | 'data' | 'selectType' | 'onActive'>
export interface ListBaseProps extends ListProps {
        render: (props: RenderListProps) => JSX.Element
}

export type HandleListActiveOptions = Pick<ListProps, 'onActive' | 'selectType' | 'onActives' | 'deselect'>
export type ListContainerProps = Pick<ListProps, 'type'>
