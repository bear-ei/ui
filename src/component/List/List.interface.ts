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

export type RenderListItemOptions = RenderVirtualListItemInfo<ListData> & ProcessRenderItemOptions
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
                | 'enableUnderlay'
                | 'enableUnderlayActive'
                | 'minSkeletonDuration'
                | 'onActive'
                | 'onActiveAfterAffordance'
                | 'onCancel'
                | 'onClose'
                | 'onConfirm'
                | 'shape'
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
}

export interface RenderListProps extends ListProps {
    onUnmount?: (value?: string) => void
}

export interface InitialListState {
    afterAffordanceActiveKey?: string
    listActiveKey?: string
    listActiveKeys?: string[]
    nextAfterAffordanceCallback?: () => void
    nextActiveCallback?: () => void
    status: ComponentStatus
}

export type ProcessRenderItemOptions = Pick<
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
    | 'enableUnderlay'
    | 'enableUnderlayActive'
    | 'minSkeletonDuration'
    | 'onActive'
    | 'onActiveAfterAffordance'
    | 'onCancel'
    | 'onClose'
    | 'onConfirm'
    | 'renderItem'
    | 'shape'
    | 'skeletonElement'
    | 'supportingTextNumberOfLines'
    | 'trailingTrigger'
    | 'type'
>

export interface ListBaseProps extends ListProps {
    render: (props: RenderListProps) => React.JSX.Element
}

export type ProcessListActiveOptions = Pick<ListProps, 'onActive' | 'type' | 'onActives' | 'deselect'>
