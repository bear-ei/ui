import {RefAttributes} from 'react'
import {ComponentStatus} from '../Common'
import {RenderVirtualListItemInfo, VirtualList, VirtualListProps} from '../Virtual-list'
import {ListItemProps} from './List-item'

export type VirtualListComponent<T> = typeof VirtualList<T>
export type ListType = 'select' | 'standard' | 'multiselect'
export interface ListData
    extends Pick<
        ListItemProps,
        | 'contentStyle'
        | 'customData'
        | 'headline'
        | 'leading'
        | 'supporting'
        | 'supportingTextNumberOfLines'
        | 'trailing'
    > {
    indexKey: string

    /**
     * Used to control whether or not the item is updated in the virtual list.
     */
    extraData?: string[]
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
                | 'densityScale'
                | 'disabled'
                | 'enableUnderlay'
                | 'enableUnderlayActive'
                | 'itemShape'
                | 'skeletonMinDuration'
                | 'onActive'
                | 'onActiveAfterAffordance'
                | 'onCancel'
                | 'onClose'
                | 'onConfirm'
                | 'skeletonElement'
                | 'supportingTextNumberOfLines'
                | 'trailingTrigger'
                | 'type'
            >
    > {
    data?: ListData[]
    defaultActiveKey?: string
    defaultActiveKeys?: string[]
    deselect?: boolean
    onActives?: (values?: string[]) => void
    divider?: boolean
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
    | 'densityScale'
    | 'disabled'
    | 'divider'
    | 'enableUnderlay'
    | 'enableUnderlayActive'
    | 'itemShape'
    | 'onActive'
    | 'onActiveAfterAffordance'
    | 'onCancel'
    | 'onClose'
    | 'onConfirm'
    | 'renderItem'
    | 'skeletonElement'
    | 'skeletonMinDuration'
    | 'supportingTextNumberOfLines'
    | 'trailingTrigger'
    | 'type'
>

export interface ListBaseProps extends ListProps {
    render: (props: RenderListProps) => JSX.Element
}

export type HandleListActiveOptions = Pick<ListProps, 'onActive' | 'type' | 'onActives' | 'deselect'>
